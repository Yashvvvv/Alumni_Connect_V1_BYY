const Event = require('../models/Event');
const User = require('../models/User');
const sendNotification = require('../utils/sendNotification');

// create event
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, time, venue, bannerImage } = req.body;

        const event = await Event.create({
            title,
            description,
            date,
            time,
            venue,
            bannerImage: bannerImage || null,
            createdBy: req.user.id,
            creatorRole: req.user.role, // alumni or admin
        });

        const io = req.app.get("io");

        // notify admins (optional)
        if (req.user.role === "alumni") {
            await sendNotification(
                {
                    user: req.user._id, // creator gets confirmation
                    fromUser: req.user._id,
                    type: "announcement",
                    message: `Your event "${event.title}" was created successfully.`,
                },
                io
            );
        }

        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

// get all events
exports.getAllEvents = async (req, res) => {
    try {
        const { status, creatorRole, date } = req.query;

        let filter = {};

        // dynamically build filter object 
        if (status) filter.status = status;

        // creatorRole can be alumni or admin
        if (creatorRole) filter.creatorRole = creatorRole;
        if (date) {
            filter.date = new Date(date);
        }

        const events = await Event.find(filter).populate('createdBy', 'name email role').sort({ date: 1 });

        res.status(200).json({ events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// get event by id
exports.getEventById = async (req, res) => {
    try {
        const eventId = await Event.findById(req.params.id).populate('createdBy', 'name email role');

        if (!eventId) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ event: eventId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// update event(admin or alumni who created)
// Alumni can update only their own events
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id); s

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // check if user is admin or the creator(alumni), only then allow update i.e. either admin or the alumni who created the event can update 
        if (req.user.role !== 'admin' && event.createdBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this event' });
        }

        const updateEvent = await Event.findByIdAndUpdate(req.params.id, udpates, { new: true });

        res.status(200).json({ message: 'Event updated successfully', updateEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// delete event (admin or alumni who created)
exports.deleteEvent = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Only admin can delete events" });
        }

        const event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: "Event not found" });

        await event.deleteOne();

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// REGISTER FOR EVENT (Student + Alumni)
// One user can register only once
exports.registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.registeredUsers.some((reg) => reg.user.toString() === req.user.id.toString())) {
            return res.status(400).json({ message: "You have already registered for this event" });
        }

        // Add user to registered list
        event.registeredUsers.push({ user: req.user.id });
        await event.save();

        // 🔔 Notify event creator
        // await Notification.create({
        //   user: event.createdBy,
        //   fromUser: req.user._id,
        //   type: "event_registration",
        //   message: `${req.user.name} registered for your event "${event.title}".`,
        // });

        const io = req.app.get("io");

        // 1) Notify EVENT CREATOR (alumni/admin)
        await sendNotification(
            {
                user: event.createdBy._id,              // receiver
                fromUser: req.user._id,                 // student/alumni who registered
                type: "event_registration",
                message: `${req.user.name} registered for your event "${event.title}".`,
            },
            io
        );

        // 2) (Optional) Notify PARTICIPANT themself
        await sendNotification(
            {
                user: req.user._id,                     // the registrant
                fromUser: event.createdBy._id,
                type: "event_registration",
                message: `You registered for the event "${event.title}".`,
            },
            io
        );

        res.status(200).json({ message: "Registered for event successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



// get registered users for an event (admin or alumni who created)
exports.getRegisteredUsers = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate(
            "registeredUsers.user",
            "name email role"
        );

        if (!event) return res.status(404).json({ message: "Event not found" });

        // Only admin or creator can view participants
        if (
            req.user.role !== "admin" &&
            event.createdBy.toString() !== req.user._id.toString()
        ) {
            return res
                .status(403)
                .json({ message: "You are not allowed to view participants" });
        }
        res.status(200).json({
            participants: event.registeredUsers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
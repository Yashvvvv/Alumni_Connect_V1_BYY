const express = require('express');
const router = express.Router();

const {createEvent, getAllEvents, getEventById,updateEvent, deleteEvent, registerForEvent, getRegisteredUsers} = require('../controllers/eventController');
const {protect, authorizeRoles} = require('../middleware/authMiddleware');


// create event (protected and by alumni or admin)
router.post('/', protect, createEvent);

// get all events( public, but with filters and logged in user can see registered status)
router.get('/', protect, getAllEvents);

// get event by id (public, but with registered status if logged in)
router.get('/:id', protect, getEventById);

// update event by id (protected and by creator only)
router.put('/:id', protect, authorizeRoles('admin', 'alumni') ,updateEvent);

// delete event by id (protected and by creator only)
router.delete('/:id', protect, authorizeRoles('admin', 'alumni'), deleteEvent);

// register for event (protected and by student or alumni)
router.post('/:id/register', protect, authorizeRoles('student', 'alumni'), registerForEvent);

// get registered users for an event (protected and by creator only)
router.get('/:id/participants', protect, authorizeRoles('admin', 'alumni'), getRegisteredUsers);

module.exports = router;
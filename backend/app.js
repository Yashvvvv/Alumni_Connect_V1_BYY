const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const jobRoutes = require("./routes/jobRoutes");
const connectionRoutes = require("./routes/connectionRoutes");
const eventRoutes = require("./routes/eventRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const searchRoutes = require("./routes/searchRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");

const http = require('http');
const {Server} = require('socket.io');

// Load environment variables
dotenv.config();
connectDB();

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors());

// Route Middlewares
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/connections", connectionRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);

// Create HTTP server, and setup Socket.io for real-time features
const server = http.createServer(app);

// Setup Socket.io, allowing CORS from any origin and GET, POST methods, allowing real-time communication
const io =  new Server(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Store online users in memory, mapping userId to socketId
global.onlineUsers = {};

io.on("connection", (socket) => {
    console.log("User Connected: ", socket.id);

    // --- 1. When a user joins ---
    socket.on("join", (userId) => {
        onlineUsers[userId] = socket.id;
        console.log("Online Users =>", onlineUsers);
    });

    // --- 2. Real-time Chat Message Event ---
    socket.on("send_message", (data) => {
        console.log("📩 Incoming Message:", data);

        const receiverSocket = onlineUsers[data.receiverId];

        if (receiverSocket) {
            // Send message instantly to receiver
            io.to(receiverSocket).emit("new_message", data);
            console.log("📤 Message sent to:", receiverSocket);
        } else {
            console.log("⚠ Receiver offline → message saved only in DB");
        }
    });

    // --- 3. When user disconnects ---
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        for (const id in onlineUsers) {
            if (onlineUsers[id] === socket.id) {
                delete onlineUsers[id];
                break;
            }
        }
    });
});


// Make io accessible to routes and accessible in controllers
app.set("io", io);

// Start Server, and listen on specified PORT
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

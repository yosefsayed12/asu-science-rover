const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/aiRoutes");
const telegramRoutes = require("./routes/telegramRoute");
const joinRoutes = require("./routes/joinRoute");

const app = express();

// ========================================
// Middleware
// ========================================

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "https://asu-science-rover.vercel.app"
    ]
}));

app.use(express.json());


// ========================================
// Routes
// ========================================

app.use("/api/ai", aiRoutes);
app.use("/api/telegram", telegramRoutes);
app.use("/api/join", joinRoutes);


// ========================================
// Test Route
// ========================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ASU Science Rover Backend is running",
    });
});


// ========================================
// 404
// ========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not found"
    });
});


// ========================================
// Error Handler
// ========================================

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

module.exports = app;
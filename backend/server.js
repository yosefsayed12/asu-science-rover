const express = require("express");
const cors = require("cors");
const config = require("./config/config");

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
        "http://localhost:5500"
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
// Start Server
// ========================================

app.listen(config.port, () => {
    console.log(
        `Server running on port ${config.port}`
    );
});
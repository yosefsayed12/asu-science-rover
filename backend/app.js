const express = require('express');
const aiRoutes = require('./routes/ai.route');
const telegramRoutes = require("./routes/telegramRoute");

const app = express();

app.use(express.json());

app.use('/api/ai', aiRoutes);
app.use("/api/telegram", telegramRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route Not found'
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});
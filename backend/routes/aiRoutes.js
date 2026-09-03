const express = require("express");
const { ask } = require("../controllers/aiController");
const aiRateLimit = require("../middleware/aiRateLimit");

const router = express.Router();

router.post("/ask", aiRateLimit,ask);


module.exports = router;
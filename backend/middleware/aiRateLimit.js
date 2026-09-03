const { Redis } = require("@upstash/redis");
const { Ratelimit } = require("@upstash/ratelimit");

const redis = Redis.fromEnv();

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: "ai-rate-limit",
});

async function aiRateLimit(req, res, next) {
    try {
        const anonymousUserId = req.headers["x-anonymous-user-id"];

        if (!anonymousUserId) {
            return res.status(400).json({
                success: false,
                message: "Anonymous User ID is required.",
            });
        }

        const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.ip || "unknown";

        const identifier = `${anonymousUserId}:${ip}`;

        const result = await rateLimit.limit(identifier);

        if (!result.success) {
            return res.status(429).json({
                success: false,
                message:
                    "لقد تجاوزت عدد الأسئلة المسموح بها خلال دقيقة. حاول مرة أخرى بعد قليل.",
                retryAfter: result.reset,
            });
        }

        next();

    } catch (error) {
        console.error("Rate Limit Error:", error);

        // لو Upstash حصل فيه مشكلة، منوقفش الـAI
        next();
    }
}

module.exports = aiRateLimit;
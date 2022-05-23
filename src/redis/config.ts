import { createClient } from "redis";

export const redisClient: any = createClient(
    {
        url: process.env.REDIS_URL,
        legacyMode: true
    }
);


import { Request, Response, Router } from "express";
import { PrismaClient } from "../../generated/prisma";

const router = Router();
const prisma = new PrismaClient()

router.post('/recordEvent', async (req: Request, res: Response) => {
    const { event_name, utm_source, referrer, user_agent, url, user_ip } = req.body;

    const recordEvent = await prisma.event.create({
        data: {
            event_name,
            utm_source,
            referrer,
            user_agent,
            url,
            user_ip
        }
    });

    if (!recordEvent) return res.status(500).json(
        { err: "error recording event" }
    );

    return res.send("event recorded successfully!")



});

export default router;
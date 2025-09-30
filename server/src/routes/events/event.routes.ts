import { Request, Response, Router } from "express";
import { PrismaClient } from "../../generated/prisma";

const router = Router();
const prisma = new PrismaClient()

router.post('/recordEvent', async (req: Request, res: Response) => {
    const { event_name, utm_source, referrer, user_agent, url, user_ip, session_id } = req.body;

    const recordEvent = await prisma.event.create({
        data: {
            event_name,
            utm_source,
            referrer,
            user_agent,
            url,
            user_ip,
            session_id: session_id
        }
    });

    if (!recordEvent) return res.status(500).json(
        { err: "error recording event" }
    );

    return res.send("event recorded successfully!")



});


router.get('/all-event', async (req, res) => {
    const data = await prisma.event.findMany({

    });
    if (!data) return res.status(404).json({
        error: "No event found"
    })
    res.status(200).json({
        data
    })

});

router.get('/session/:session', async (req, res) => {
    const sessionId = req.params.session;

    const data = await prisma.event.findMany({
        where: {
            session_id: sessionId
        }
    });

    if (!data) return res.status(404).json({
        err: "No event found for this session",
    })

    res.status(200).json({
        data
    });
})

router.get('/user/:ip', async (req, res) => {
    const userIp = req.params.ip;
    try {
        const data = await prisma.event.findMany({
            where: {
                user_ip: userIp
            }
        });

        if (!data) return res.status(404).json({
            err: "No event for this user found"
        });

        return res.status(200).json({
            data
        });
    } catch (error) {
        console.log(error);

    }
})

export default router;
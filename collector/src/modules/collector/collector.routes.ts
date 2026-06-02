import { Router, type Request, type Response } from "express";
import { prisma } from "../../config/database/index.js";

const router = Router()

router.get('/collect', (req: Request, res: Response) => {
    res.status(200).json({
        "Hello": "World"
    });
});

router.post('/collect', async (req: Request, res: Response) => {
    try {
        const {
            eventType = "PAGE_VIEW",
            sourceId,
            sourceIdentifier,
            referrer,
            viewerId,
            userAgent,
        } = req.body ?? {};

        if (eventType !== "PAGE_VIEW") {
            return res.status(400).json({ message: "Unsupported event type" });
        }

        const source = sourceId
            ? await prisma.source.findUnique({ where: { sourceId } })
            : sourceIdentifier
                ? await prisma.source.findFirst({ where: { identifier: sourceIdentifier } })
                : null;

        if (!source) {
            return res.status(404).json({ message: "Source not found" });
        }

        let viewer = viewerId
            ? await prisma.viewer.findUnique({ where: { id: viewerId } })
            : null;

        if (!viewer) {
            viewer = await prisma.viewer.create({
                data: {
                    userAgent: userAgent || req.get("user-agent") || null,
                },
            });
        } else {
            viewer = await prisma.viewer.update({
                where: { id: viewer.id },
                data: {
                    lastVisit: new Date(),
                    userAgent: userAgent || viewer.userAgent,
                },
            });
        }

        const event = await prisma.event.create({
            data: {
                eventType: "PAGE_VIEW",
                referrer: referrer || req.get("referer") || "",
                sourceId: source.sourceId,
                viewerId: viewer.id,
            },
        });

        return res.status(201).json({
            message: "Pageview recorded",
            event,
            viewerId: viewer.id,
        });
    } catch (error) {
        console.error("collector error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



export default router;
import { Router, type Request, type Response } from "express";

const router = Router()

router.get('/collect', (req: Request, res: Response) => {
    res.status(200).json({
        "Hello": "World"
    });
})

export default router;
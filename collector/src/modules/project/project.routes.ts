import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { createProjectController, addSourceToProjectController } from "./project.controller.js";

const router = Router();

router.get('/projects', async (req: Request, res: Response) => {

});

router.get('/project/:projectId', async (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
});

router.post('/create', authMiddleware, createProjectController);
router.post('/:projectId/sources', authMiddleware, addSourceToProjectController);

export default router;
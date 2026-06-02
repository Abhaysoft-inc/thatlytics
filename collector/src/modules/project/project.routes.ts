import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import { addSourceToProjectController, createProjectController, getProjectController, listProjectsController } from "./project.controller.js";

const router = Router();

router.get('/projects', authMiddleware, listProjectsController);
router.get('/project/:projectId', authMiddleware, getProjectController);
router.post('/create', authMiddleware, createProjectController);
router.post('/:projectId/sources', authMiddleware, addSourceToProjectController);

export default router;
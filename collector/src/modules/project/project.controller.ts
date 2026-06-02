import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { addSourceToProjectService, createProjectService, getProjectByIdForUserService, getProjectsForUserService } from "./project.services.js";

const getUserId = (req: Request) => {
    const user = req.user as jwt.JwtPayload | undefined;
    return user?.id;
};

export const listProjectsController = async (req: Request, res: Response) => {
    try {
        const userId = getUserId(req);

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        const projects = await getProjectsForUserService(userId);

        return res.status(200).json({ projects });
    } catch (error) {
        console.error("error listing projects:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getProjectController = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const userId = getUserId(req);

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        if (!projectId) {
            return res.status(400).json({ error: "projectId is required" });
        }

        const project = await getProjectByIdForUserService(projectId, userId);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json({ project });
    } catch (error) {
        console.error("error getting project:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createProjectController = async (req: Request, res: Response) => {
    try {
        const { projectName } = req.body;

        const userId = getUserId(req);

        if (!projectName) {
            return res.status(400).json({ error: "projectName is required" });
        }

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        const project = await createProjectService(projectName, userId);

        return res.status(201).json({
            message: "Project created successfully",
            project
        });
    } catch (error: any) {
        console.error("error creating project:", error);

        if (error.message === "Project with this name already exists") {
            return res.status(409).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addSourceToProjectController = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const { sourceName, sourceType, identifier } = req.body;

        const userId = getUserId(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        if (!projectId || !sourceName || !sourceType || !identifier) {
            return res.status(400).json({ error: "Missing required fields: projectId, sourceName, sourceType, identifier" });
        }

        if (!['WEB', 'ANDROID', 'IOS'].includes(sourceType)) {
            return res.status(400).json({ error: "Invalid sourceType. Must be WEB, ANDROID, or IOS." });
        }

        const source = await addSourceToProjectService(projectId, sourceName, sourceType, identifier);

        return res.status(201).json({
            message: "Source added successfully",
            source
        });
    } catch (error: any) {
        console.error("error adding source:", error);

        if (error.message === "Project not found") {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
};

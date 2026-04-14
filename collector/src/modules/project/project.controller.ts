import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createProjectService, addSourceToProjectService } from "./project.services.js";

export const createProjectController = async (req: Request, res: Response) => {
    try {
        const { projectName } = req.body;

        const user = req.user as jwt.JwtPayload | undefined;
        const userId = user?.id;

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

        const user = req.user as jwt.JwtPayload | undefined;
        if (!user?.id) {
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

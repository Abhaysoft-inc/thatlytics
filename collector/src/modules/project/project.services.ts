import { prisma } from "../../config/database/index.js";

export const createProjectService = async (projectName: string, userId: string) => {
    // check if project with same name exists
    const existingProject = await prisma.project.findFirst({
        where: {
            projectName,
            userId
        }
    });

    if (existingProject) {
        throw new Error("Project with this name already exists");
    }

    const project = await prisma.project.create({
        data: {
            projectName,
            userId
        }
    });

    return project;
};

// add a source in the project
export const addSourceToProjectService = async (
    projectId: string,
    sourceName: string,
    sourceType: 'WEB' | 'ANDROID' | 'IOS',
    identifier: string
) => {
    const project = await prisma.project.findUnique({
        where: { id: projectId }
    });

    if (!project) {
        throw new Error("Project not found");
    }

    const source = await prisma.source.create({
        data: {
            projectId,
            sourceName,
            sourceType,
            identifier
        }
    });

    return source;
};



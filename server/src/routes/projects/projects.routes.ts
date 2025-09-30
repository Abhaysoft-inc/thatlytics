import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import fetchUser from "../../middleware/userData";

const router = Router();
const primsa = new PrismaClient();

// create a project 

router.post('/new', async (req, res) => {
    const { projectName, url, jwtToken } = req.body;

    const userId = await fetchUser(jwtToken)
    res.send(userId);

    try {
        // const project = await primsa.project.create({
        //     data: {
        //         projectName,
        //         url,
        //         owner: {
        //             connect: { userId }
        //         }
        //     },

        // })
    } catch (error) {

    }


})


export default router
import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const router = Router()
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET as string

// user signup

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // check data is not null
        // check if email already exists
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (user) return res.status(400).json({ err: "Email Address already exists" });
        const hashedPassword = await bcrypt.hash(password, 5);

        const userCreated = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        if (!userCreated) return res.status(400).json({
            err: "Something went wrong while creating user"
        });

        return res.status(200).json({
            success: "user creation success",
            userCreated
        });


    } catch (error) {
        res.status(500).json({
            err: "Something Went Wrong"
        });
        console.log(error)

    }

});


// user login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if email and password is not null

        // if(email=="" || ) return res.status(401).json({err:"username and password is required!"})

        const isUserExists = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!isUserExists) return res.status(401).json({
            error: "Email or Password is Incorrect!"
        });

        const hashedPassword = isUserExists.password;
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordMatched) return res.status(401).json({
            error: "Email or Passoword is Incorrect!"
        });

        // generate jwt and add userId to it

        const jwtToken = await jwt.sign({
            userId: isUserExists.userId
        }, JWT_SECRET)

        return res.status(200).json({
            success: "Login Success",
            token: jwtToken
        });

    } catch (err) {
        console.log(err);

    }
})

export default router
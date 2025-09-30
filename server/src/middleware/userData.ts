import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string


export default async function fetchUser(jwtToken: string) {
    const userId = await jwt.verify(jwtToken, JWT_SECRET);
    return userId;
}
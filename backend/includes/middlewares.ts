import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

export const authenticate: RequestHandler = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        jwt.verify(token, 'my_secret_key')
        next();

    } catch (err) {
        res.status(401).json({ message: "Invalid Token" })
    }
}
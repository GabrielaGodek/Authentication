import * as jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { secretKey } from '../db/config'

export const authenticate: RequestHandler = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        jwt.verify(token, secretKey)
        next();

    } catch (err) {
        res.status(401).json({ message: "Invalid Token" })
    }
}
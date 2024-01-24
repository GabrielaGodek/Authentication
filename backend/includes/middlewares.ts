import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { secretKey } from '../db/config'
import { MiddlewareRequest } from './types'


export const authenticate = (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const token = req.header('authorization');
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const decodedToken: any = jwt.verify(token, secretKey)
        req.user = decodedToken
        next();

    } catch (err) {
        res.status(401).json({ message: "Invalid Token" })
    }
}
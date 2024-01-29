import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { secretKey } from '../db/config'
import { MiddlewareRequest } from './types'


export const authenticate = (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const token = req.header('authorization');

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    // try {
    const decodedToken: any = jwt.verify(token, secretKey)

    if (decodedToken){
        req.user = decodedToken
        next();
    } else {
        console.log('Invalid')
    }

}
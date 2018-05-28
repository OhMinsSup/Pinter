import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';


export function generateToken (payload: any, options?: any): Promise<string> {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                payload,
                JWT_SECRET,
                {
                    expiresIn: '7d',
                    ...options
                }, (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                }
            );
        }
    );
};

export function decodeToken (token: string): Promise<any> {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(
                token,
                JWT_SECRET,
                (error, decoded) => {
                    if(error) reject(error);
                    resolve(decoded);
                }
            );
        }
    );
}  
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export const createJWTtoken = user => {
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: "1h"
    })
}
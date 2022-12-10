import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    try {
        const verified = jwt.verify(token, JWT_SECRET)
        req.verifiedUser = verified.user
    } catch (error) {
    } finally {
        next()
    }
}
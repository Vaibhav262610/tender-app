"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined. Please check your .env file and dotenv.config().');
}
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ msg: 'No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        console.log('Verifying token:', token);
        console.log('Using secret:', JWT_SECRET);
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error('JWT verification failed:', err);
        res.status(403).json({ msg: 'Invalid or expired token' });
    }
};
exports.verifyToken = verifyToken;

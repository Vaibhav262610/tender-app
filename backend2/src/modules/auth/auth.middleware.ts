import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined. Please check your .env file and dotenv.config().');
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ msg: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log('Verifying token:', token);
    console.log('Using secret:', JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    res.status(403).json({ msg: 'Invalid or expired token' });
  }
};

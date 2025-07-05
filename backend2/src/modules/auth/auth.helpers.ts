import jwt from 'jsonwebtoken';

interface JWTPayload {
  id: number;
  email: string;
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

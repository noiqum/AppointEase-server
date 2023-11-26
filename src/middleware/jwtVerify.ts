import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization as string;

  if (!authHeader?.includes('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  interface CustomRequest extends Request {
    name: any;
    email: any;
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET || '',
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      if (typeof decoded === 'string') {
        // Handle the case where decoded is a string
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Now TypeScript knows that decoded is JwtPayload
      (req as CustomRequest).name = decoded?.userInfo?.username;
      (req as CustomRequest).email = decoded?.userInfo?.email;
      next();
    }
  );
};



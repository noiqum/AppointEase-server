import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import { omit } from "lodash";
import logger from "../utils/logger";
import  jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken"
import UserModal from "../models/user.model";
export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.status(200).send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const user = await UserModal.findOne({ email: req.body.email });
    if (!user) {
      return res.sendStatus(401).json({ message: "User not found" });
    }
    const isValid = await user.comparePassword(req.body.password);
    if (!isValid) {
      return res.sendStatus(401).json({ message: "Incorrect password" });
    } else {
      const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": user.name,
                "email":user.email
            }
        },
        process.env.ACCESS_TOKEN_SECRET || "",
        { expiresIn: '1h' }
    )

    const refreshToken = jwt.sign(
        { "username": user.name },
        process.env.REFRESH_TOKEN_SECRET || "",
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: "none", //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })
    return res.status(200).json({
      ...omit(user.toJSON(), "password"),
      accessToken: accessToken
    });
    }
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || '',
    async (err:VerifyErrors | null,decoded:string | JwtPayload | undefined) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const decodedPayload = decoded as JwtPayload;

      const foundUser = await UserModal.findOne({ email: decodedPayload.email }).exec();

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.name,
            roles: foundUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET || '',
        { expiresIn: '1d' }
      );

      res.json({ accessToken });
    }
  );
};

export const logout = (req:Request, res:Response) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
  res.json({ message: 'Cookie cleared' })
}
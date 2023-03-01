import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function JWT(req: Request, res: Response, next: NextFunction) {
  try {
    const decoded = verify(req.header("x-auth-token")!, process.env.JWT!);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

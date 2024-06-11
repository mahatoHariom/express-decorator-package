
import express from "express";

export type Method = "get" | "post" | "put" | "delete";
export interface Middleware {
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void;
}

export interface RouteMetadata {
  method: Method;
  path: string;
  handler: PropertyKey;
}


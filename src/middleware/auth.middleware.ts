import type { NextFunction, Response } from "express";
import type { AuthService } from "../services/auth.service";
import type { AuthenticatedRequest } from "../types/auth";
import { HttpError } from "../utils/http-error";

export function createAuthMiddleware(authService: AuthService) {
  return async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith("Bearer ")) {
      next(new HttpError(401, "Authorization token is required."));
      return;
    }

    const token = authorizationHeader.slice("Bearer ".length).trim();

    if (!token) {
      next(new HttpError(401, "Authorization token is required."));
      return;
    }

    try {
      req.user = await authService.getCurrentUser(token);
      next();
    } catch (error) {
      next(error);
    }
  };
}
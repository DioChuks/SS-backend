import type { Response } from "express";
import type { AuthenticatedRequest } from "@/types/auth";
import { requireApprovedKYC } from "@/lib/kyc";
import { KYCStatus } from "@/types/enums";

export async function publishInvoice(req: AuthenticatedRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    requireApprovedKYC(req.user);

    // Your publish logic here
    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(err.status || 500).json({
      error: { code: err.code || "INTERNAL_ERROR", message: err.message },
    });
  }
}
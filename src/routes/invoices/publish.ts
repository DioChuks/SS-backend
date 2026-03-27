import { Request, Response } from "express";
import { requireApprovedKYC } from "@/lib/kyc";
import { KYCStatus } from "@/types/enums";

export async function publishInvoice(req: Request, res: Response) {
  try {
    const user = req.user as { kycStatus: KYCStatus };

    requireApprovedKYC(user);

    // Your publish logic here
    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(err.status || 500).json({
      error: { code: err.code || "INTERNAL_ERROR", message: err.message },
    });
  }
}
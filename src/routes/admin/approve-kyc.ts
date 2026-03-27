import { Request, Response } from "express";
import { DataSource } from "typeorm";
import { User } from "@/entities/User";
import { KYCStatus } from "@/types/enums";

export async function approveKYC(req: Request, res: Response, dataSource: DataSource) {
  try {
    const adminKey = req.headers["x-admin-key"];
    if (adminKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { userId } = req.body as { userId: string };

    const userRepo = dataSource.getRepository(User);
    await userRepo.update(userId, { kycStatus: KYCStatus.APPROVED });

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({
      error: { code: err.code || "INTERNAL_ERROR", message: err.message },
    });
  }
}
import { KYCStatus } from "@/types/enums";
import type { AuthenticatedRequestUser } from "@/types/auth";

export function requireApprovedKYC(user: Pick<AuthenticatedRequestUser, "kycStatus">) {
  if (user.kycStatus !== KYCStatus.APPROVED) {
    const error: any = new Error("KYC not approved");
    error.status = 403;
    error.code = "KYC_NOT_APPROVED";
    throw error;
  }
}
-- CreateEnum
CREATE TYPE "EmailVerificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_verification_status" "EmailVerificationStatus" NOT NULL DEFAULT 'PENDING';

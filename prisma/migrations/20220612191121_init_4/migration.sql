-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "given_name" DROP NOT NULL,
ALTER COLUMN "family_name" DROP NOT NULL,
ALTER COLUMN "picture" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "locale" DROP NOT NULL,
ALTER COLUMN "accessToken" DROP NOT NULL;

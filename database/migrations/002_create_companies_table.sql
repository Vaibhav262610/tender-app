-- Migration: 002_create_companies_table.sql
-- Description: Create Companies table for company profiles
-- Created: 2024-01-01

-- Create Companies table
CREATE TABLE "Companies" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "logoUrl" VARCHAR(500),
    "industry" VARCHAR(255) NOT NULL,
    "aboutCompany" TEXT NOT NULL,
    "foundedYear" VARCHAR(4),
    "companySize" VARCHAR(100),
    "companyLocation" VARCHAR(255) NOT NULL,
    "companyWebsite" VARCHAR(500),
    "contactEmail" VARCHAR(255),
    "contactNumber" VARCHAR(20),
    "productsOrServices" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT "fk_companies_user" FOREIGN KEY ("userId") 
        REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for better performance
CREATE INDEX "idx_companies_user_id" ON "Companies" ("userId");
CREATE INDEX "idx_companies_industry" ON "Companies" ("industry");
CREATE INDEX "idx_companies_location" ON "Companies" ("companyLocation");
CREATE INDEX "idx_companies_created_at" ON "Companies" ("createdAt");

-- Add unique constraint to ensure one company per user
CREATE UNIQUE INDEX "idx_companies_user_unique" ON "Companies" ("userId");

-- Add comments for documentation
COMMENT ON TABLE "Companies" IS 'Stores detailed company information linked to users';
COMMENT ON COLUMN "Companies"."id" IS 'Primary key, auto-incrementing';
COMMENT ON COLUMN "Companies"."userId" IS 'Foreign key to Users table';
COMMENT ON COLUMN "Companies"."logoUrl" IS 'URL to company logo stored in Supabase';
COMMENT ON COLUMN "Companies"."industry" IS 'Company industry sector';
COMMENT ON COLUMN "Companies"."aboutCompany" IS 'Detailed company description';
COMMENT ON COLUMN "Companies"."foundedYear" IS 'Year company was established';
COMMENT ON COLUMN "Companies"."companySize" IS 'Number of employees or company size category';
COMMENT ON COLUMN "Companies"."companyLocation" IS 'Physical location of the company';
COMMENT ON COLUMN "Companies"."companyWebsite" IS 'Company website URL';
COMMENT ON COLUMN "Companies"."contactEmail" IS 'Company contact email';
COMMENT ON COLUMN "Companies"."contactNumber" IS 'Company contact phone number';
COMMENT ON COLUMN "Companies"."productsOrServices" IS 'Description of company offerings';
COMMENT ON COLUMN "Companies"."createdAt" IS 'Timestamp when company profile was created';
COMMENT ON COLUMN "Companies"."updatedAt" IS 'Timestamp when company profile was last updated'; 
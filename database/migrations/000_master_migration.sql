-- Master Migration File
-- Description: Complete database setup for Tender Management System
-- Created: 2024-01-01
-- Run this file to set up the entire database schema

-- Start transaction
BEGIN;

-- =====================================================
-- Migration 001: Create Users Table
-- =====================================================

-- Create Users table
CREATE TABLE "Users" (
    "id" SERIAL PRIMARY KEY,
    "companyname" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "jobtitle" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for Users table
CREATE INDEX "idx_users_email" ON "Users" ("email");
CREATE INDEX "idx_users_created_at" ON "Users" ("createdAt");

-- Add comments for Users table
COMMENT ON TABLE "Users" IS 'Stores user authentication and profile information';
COMMENT ON COLUMN "Users"."id" IS 'Primary key, auto-incrementing';
COMMENT ON COLUMN "Users"."email" IS 'Unique email address for login';
COMMENT ON COLUMN "Users"."password" IS 'Hashed password using bcrypt';
COMMENT ON COLUMN "Users"."refreshToken" IS 'JWT refresh token for authentication';
COMMENT ON COLUMN "Users"."createdAt" IS 'Timestamp when user was created';
COMMENT ON COLUMN "Users"."updatedAt" IS 'Timestamp when user was last updated';

-- =====================================================
-- Migration 002: Create Companies Table
-- =====================================================

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

-- Create indexes for Companies table
CREATE INDEX "idx_companies_user_id" ON "Companies" ("userId");
CREATE INDEX "idx_companies_industry" ON "Companies" ("industry");
CREATE INDEX "idx_companies_location" ON "Companies" ("companyLocation");
CREATE INDEX "idx_companies_created_at" ON "Companies" ("createdAt");

-- Add unique constraint to ensure one company per user
CREATE UNIQUE INDEX "idx_companies_user_unique" ON "Companies" ("userId");

-- Add comments for Companies table
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

-- =====================================================
-- Migration 003: Create Tenders Table
-- =====================================================

-- Create enum for tender status
CREATE TYPE tender_status_enum AS ENUM ('open', 'in_progress', 'awarded', 'closed');

-- Create Tenders table
CREATE TABLE "Tenders" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "budget" DECIMAL(15, 2) NOT NULL,
    "deadline" TIMESTAMP WITH TIME ZONE NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "requirements" TEXT NOT NULL,
    "status" tender_status_enum NOT NULL DEFAULT 'open',
    "submissionDeadline" TIMESTAMP WITH TIME ZONE NOT NULL,
    "contactEmail" VARCHAR(255) NOT NULL,
    "contactPhone" VARCHAR(20) NOT NULL,
    "attachments" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT "fk_tenders_user" FOREIGN KEY ("userId") 
        REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for Tenders table
CREATE INDEX "idx_tenders_user_id" ON "Tenders" ("userId");
CREATE INDEX "idx_tenders_status" ON "Tenders" ("status");
CREATE INDEX "idx_tenders_category" ON "Tenders" ("category");
CREATE INDEX "idx_tenders_location" ON "Tenders" ("location");
CREATE INDEX "idx_tenders_deadline" ON "Tenders" ("deadline");
CREATE INDEX "idx_tenders_submission_deadline" ON "Tenders" ("submissionDeadline");
CREATE INDEX "idx_tenders_budget" ON "Tenders" ("budget");
CREATE INDEX "idx_tenders_created_at" ON "Tenders" ("createdAt");

-- Add comments for Tenders table
COMMENT ON TABLE "Tenders" IS 'Stores tender/project information created by users';
COMMENT ON COLUMN "Tenders"."id" IS 'Primary key, auto-incrementing';
COMMENT ON COLUMN "Tenders"."userId" IS 'Foreign key to Users table (tender creator)';
COMMENT ON COLUMN "Tenders"."title" IS 'Tender title';
COMMENT ON COLUMN "Tenders"."description" IS 'Detailed tender description';
COMMENT ON COLUMN "Tenders"."category" IS 'Tender category or type';
COMMENT ON COLUMN "Tenders"."budget" IS 'Project budget in decimal format';
COMMENT ON COLUMN "Tenders"."deadline" IS 'Project completion deadline';
COMMENT ON COLUMN "Tenders"."location" IS 'Project location';
COMMENT ON COLUMN "Tenders"."requirements" IS 'Project requirements and specifications';
COMMENT ON COLUMN "Tenders"."status" IS 'Current status of the tender';
COMMENT ON COLUMN "Tenders"."submissionDeadline" IS 'Deadline for application submissions';
COMMENT ON COLUMN "Tenders"."contactEmail" IS 'Contact email for tender inquiries';
COMMENT ON COLUMN "Tenders"."contactPhone" IS 'Contact phone for tender inquiries';
COMMENT ON COLUMN "Tenders"."attachments" IS 'Additional files or attachments (JSON or text)';
COMMENT ON COLUMN "Tenders"."createdAt" IS 'Timestamp when tender was created';
COMMENT ON COLUMN "Tenders"."updatedAt" IS 'Timestamp when tender was last updated';

-- =====================================================
-- Migration 004: Create Applications Table
-- =====================================================

-- Create enum for application status
CREATE TYPE application_status_enum AS ENUM ('pending', 'approved', 'rejected');

-- Create Applications table
CREATE TABLE "Applications" (
    "id" SERIAL PRIMARY KEY,
    "tenderId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" application_status_enum NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraints
    CONSTRAINT "fk_applications_tender" FOREIGN KEY ("tenderId") 
        REFERENCES "Tenders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "fk_applications_user" FOREIGN KEY ("userId") 
        REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for Applications table
CREATE INDEX "idx_applications_tender_id" ON "Applications" ("tenderId");
CREATE INDEX "idx_applications_user_id" ON "Applications" ("userId");
CREATE INDEX "idx_applications_status" ON "Applications" ("status");
CREATE INDEX "idx_applications_created_at" ON "Applications" ("createdAt");

-- Create composite index for common queries
CREATE INDEX "idx_applications_tender_user" ON "Applications" ("tenderId", "userId");

-- Add unique constraint to prevent duplicate applications
CREATE UNIQUE INDEX "idx_applications_tender_user_unique" ON "Applications" ("tenderId", "userId");

-- Add comments for Applications table
COMMENT ON TABLE "Applications" IS 'Stores applications submitted by users for tenders';
COMMENT ON COLUMN "Applications"."id" IS 'Primary key, auto-incrementing';
COMMENT ON COLUMN "Applications"."tenderId" IS 'Foreign key to Tenders table';
COMMENT ON COLUMN "Applications"."userId" IS 'Foreign key to Users table (applicant)';
COMMENT ON COLUMN "Applications"."status" IS 'Current status of the application';
COMMENT ON COLUMN "Applications"."createdAt" IS 'Timestamp when application was submitted';
COMMENT ON COLUMN "Applications"."updatedAt" IS 'Timestamp when application was last updated';

-- =====================================================
-- Migration Complete
-- =====================================================

-- Commit all changes
COMMIT;

-- Display success message
DO $$
BEGIN
    RAISE NOTICE 'Database migration completed successfully!';
    RAISE NOTICE 'Created tables: Users, Companies, Tenders, Applications';
    RAISE NOTICE 'Created enums: tender_status_enum, application_status_enum';
    RAISE NOTICE 'Created indexes and constraints for optimal performance';
END $$; 
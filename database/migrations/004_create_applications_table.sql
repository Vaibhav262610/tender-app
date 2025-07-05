-- Migration: 004_create_applications_table.sql
-- Description: Create Applications table for tender applications
-- Created: 2024-01-01

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

-- Create indexes for better performance
CREATE INDEX "idx_applications_tender_id" ON "Applications" ("tenderId");
CREATE INDEX "idx_applications_user_id" ON "Applications" ("userId");
CREATE INDEX "idx_applications_status" ON "Applications" ("status");
CREATE INDEX "idx_applications_created_at" ON "Applications" ("createdAt");

-- Create composite index for common queries
CREATE INDEX "idx_applications_tender_user" ON "Applications" ("tenderId", "userId");

-- Add unique constraint to prevent duplicate applications
CREATE UNIQUE INDEX "idx_applications_tender_user_unique" ON "Applications" ("tenderId", "userId");

-- Add comments for documentation
COMMENT ON TABLE "Applications" IS 'Stores applications submitted by users for tenders';
COMMENT ON COLUMN "Applications"."id" IS 'Primary key, auto-incrementing';
COMMENT ON COLUMN "Applications"."tenderId" IS 'Foreign key to Tenders table';
COMMENT ON COLUMN "Applications"."userId" IS 'Foreign key to Users table (applicant)';
COMMENT ON COLUMN "Applications"."status" IS 'Current status of the application';
COMMENT ON COLUMN "Applications"."createdAt" IS 'Timestamp when application was submitted';
COMMENT ON COLUMN "Applications"."updatedAt" IS 'Timestamp when application was last updated'; 
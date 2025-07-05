-- Migration: 003_create_tenders_table.sql
-- Description: Create Tenders table for tender/project information
-- Created: 2024-01-01

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

-- Create indexes for better performance
CREATE INDEX "idx_tenders_user_id" ON "Tenders" ("userId");
CREATE INDEX "idx_tenders_status" ON "Tenders" ("status");
CREATE INDEX "idx_tenders_category" ON "Tenders" ("category");
CREATE INDEX "idx_tenders_location" ON "Tenders" ("location");
CREATE INDEX "idx_tenders_deadline" ON "Tenders" ("deadline");
CREATE INDEX "idx_tenders_submission_deadline" ON "Tenders" ("submissionDeadline");
CREATE INDEX "idx_tenders_budget" ON "Tenders" ("budget");
CREATE INDEX "idx_tenders_created_at" ON "Tenders" ("createdAt");

-- Add comments for documentation
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
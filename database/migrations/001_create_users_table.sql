-- Migration: 001_create_users_table.sql
-- Description: Create Users table for authentication and user profiles
-- Created: 2024-01-01

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

-- Create indexes for better performance
CREATE INDEX "idx_users_email" ON "Users" ("email");
CREATE INDEX "idx_users_created_at" ON "Users" ("createdAt");

-- Add comments for documentation
COMMENT ON TABLE "Users" IS 'Stores user authentication and profile information';
COMMENT ON COLUMN "Users"."id" IS 'Primary key, auto-incrementing';
COMMENT ON COLUMN "Users"."email" IS 'Unique email address for login';
COMMENT ON COLUMN "Users"."password" IS 'Hashed password using bcrypt';
COMMENT ON COLUMN "Users"."refreshToken" IS 'JWT refresh token for authentication';
COMMENT ON COLUMN "Users"."createdAt" IS 'Timestamp when user was created';
COMMENT ON COLUMN "Users"."updatedAt" IS 'Timestamp when user was last updated'; 
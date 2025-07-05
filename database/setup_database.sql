-- Database Setup Script for Tender Management System
-- Description: Complete database initialization script
-- Created: 2024-01-01
-- Usage: Run this script as a PostgreSQL superuser (postgres)

-- Connect to PostgreSQL as superuser and run:
-- psql -U postgres -f setup_database.sql

-- Create database if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tender') THEN
        CREATE DATABASE tender;
        RAISE NOTICE 'Database "tender" created successfully.';
    ELSE
        RAISE NOTICE 'Database "tender" already exists.';
    END IF;
END $$;

-- Connect to the tender database
\c tender;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set timezone
SET timezone = 'UTC';

-- Display database information
SELECT 
    current_database() as database_name,
    current_user as current_user,
    version() as postgres_version;

-- Run the master migration
\i database/migrations/000_master_migration.sql

-- Display final database status
\dt+

-- Show table relationships
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- Show indexes
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname; 
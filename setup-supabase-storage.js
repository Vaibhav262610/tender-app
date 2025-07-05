#!/usr/bin/env node

/**
 * Supabase Storage Setup Script
 * 
 * This script helps you set up the company-logos bucket and policies
 * Run this after creating your Supabase project
 */

const { createClient } = require('@supabase/supabase-js');

// Configuration - Update these values
const SUPABASE_URL = process.env.SUPABASE_URL || 'your_supabase_url';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'your_service_key';

if (SUPABASE_URL === 'your_supabase_url' || SUPABASE_SERVICE_KEY === 'your_service_key') {
  console.log('❌ Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables');
  console.log('Or update the values in this script');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function setupStorage() {
  try {
    console.log('🚀 Setting up Supabase Storage for company logos...\n');

    // 1. Create the bucket
    console.log('1. Creating company-logos bucket...');
    const { data: bucketData, error: bucketError } = await supabase.storage.createBucket('company-logos', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
      fileSizeLimit: 5242880, // 5MB
    });

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('✅ Bucket already exists');
      } else {
        throw bucketError;
      }
    } else {
      console.log('✅ Bucket created successfully');
    }

    // 2. Set up RLS policies
    console.log('\n2. Setting up RLS policies...');
    
    const policies = [
      {
        name: 'Allow authenticated users to upload logos',
        sql: `
          CREATE POLICY "Allow authenticated users to upload logos" ON storage.objects
          FOR INSERT WITH CHECK (
            bucket_id = 'company-logos' AND 
            auth.role() = 'authenticated'
          );
        `
      },
      {
        name: 'Allow public read access to logos',
        sql: `
          CREATE POLICY "Allow public read access to logos" ON storage.objects
          FOR SELECT USING (bucket_id = 'company-logos');
        `
      },
      {
        name: 'Allow users to update their own logos',
        sql: `
          CREATE POLICY "Allow users to update their own logos" ON storage.objects
          FOR UPDATE USING (
            bucket_id = 'company-logos' AND 
            auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      },
      {
        name: 'Allow users to delete their own logos',
        sql: `
          CREATE POLICY "Allow users to delete their own logos" ON storage.objects
          FOR DELETE USING (
            bucket_id = 'company-logos' AND 
            auth.uid()::text = (storage.foldername(name))[1]
          );
        `
      }
    ];

    for (const policy of policies) {
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: policy.sql });
        if (error) {
          if (error.message.includes('already exists')) {
            console.log(`✅ Policy "${policy.name}" already exists`);
          } else {
            console.log(`⚠️  Policy "${policy.name}" setup failed:`, error.message);
          }
        } else {
          console.log(`✅ Policy "${policy.name}" created successfully`);
        }
      } catch (err) {
        console.log(`⚠️  Policy "${policy.name}" setup failed:`, err.message);
      }
    }

    console.log('\n🎉 Supabase Storage setup completed!');
    console.log('\nNext steps:');
    console.log('1. Configure CORS in your Supabase dashboard');
    console.log('2. Add your frontend domain to CORS settings');
    console.log('3. Test the logo upload functionality');
    console.log('4. Check the SUPABASE_STORAGE_SETUP.md file for detailed instructions');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupStorage(); 
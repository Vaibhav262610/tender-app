# Supabase Storage Setup for Company Logos

This guide will help you set up Supabase Storage for uploading and managing company logos in your B2B tender management platform.

## 1. Supabase Project Setup

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Create a new project
4. Note down your project URL and anon key

### Environment Variables
Add these to your `.env.local` file in the frontend:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 2. Storage Bucket Configuration

### Create Storage Bucket
1. In your Supabase dashboard, go to **Storage**
2. Click **Create a new bucket**
3. Name it `company-logos`
4. Set it as **Public** (so logos can be accessed without authentication)
5. Click **Create bucket**

### Configure RLS (Row Level Security)
1. Go to **Storage** > **Policies**
2. For the `company-logos` bucket, add these policies:

#### Policy 1: Allow authenticated users to upload
```sql
CREATE POLICY "Allow authenticated users to upload logos" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'company-logos' AND 
  auth.role() = 'authenticated'
);
```

#### Policy 2: Allow public read access
```sql
CREATE POLICY "Allow public read access to logos" ON storage.objects
FOR SELECT USING (bucket_id = 'company-logos');
```

#### Policy 3: Allow users to update their own uploads
```sql
CREATE POLICY "Allow users to update their own logos" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'company-logos' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
```

#### Policy 4: Allow users to delete their own uploads
```sql
CREATE POLICY "Allow users to delete their own logos" ON storage.objects
FOR DELETE USING (
  bucket_id = 'company-logos' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## 3. CORS Configuration

### Configure CORS for Storage
1. Go to **Settings** > **API**
2. Scroll down to **CORS (Cross-Origin Resource Sharing)**
3. Add your frontend domain (e.g., `http://localhost:3000` for development)
4. Make sure to include both HTTP and HTTPS versions if needed

### Example CORS Configuration
```
http://localhost:3000
https://yourdomain.com
```

## 4. File Upload Configuration

### Supported File Types
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

### File Size Limits
- Maximum file size: 5MB
- Recommended dimensions: 300x300 pixels or larger

### File Naming Convention
Files are automatically named with timestamp and random string:
```
company-logos/1703123456789-abc123def456.jpg
```

## 5. Usage in Your Application

### Frontend Component
The `LogoUpload` component handles:
- File selection and validation
- Upload to Supabase Storage
- Preview display
- Error handling
- Progress indication

### Backend Integration
The logo URL is stored in the company profile and can be updated via:
- `PUT /api/company/logo` endpoint
- Company profile update

## 6. Testing the Setup

### Test Upload
1. Start your frontend application
2. Navigate to the company profile page
3. Try uploading a logo image
4. Check that the image appears in the preview
5. Verify the image is accessible via the public URL

### Test Storage Access
1. Go to Supabase Dashboard > Storage
2. Check that uploaded files appear in the `company-logos` bucket
3. Verify public URLs work by opening them in a new tab

## 7. Troubleshooting

### Common Issues

#### CORS Errors
- Ensure your frontend domain is added to CORS settings
- Check that you're using the correct Supabase URL

#### Upload Failures
- Verify bucket permissions and RLS policies
- Check file size and type restrictions
- Ensure authentication is working properly

#### Image Not Displaying
- Verify the bucket is set to public
- Check that the public URL is correctly generated
- Ensure the image file is actually uploaded to the bucket

#### RLS Policy Issues
- Make sure policies are correctly applied to the bucket
- Check that user authentication is working
- Verify policy syntax and conditions

### Debug Steps
1. Check browser console for errors
2. Verify Supabase client configuration
3. Test with a simple file upload first
4. Check network tab for failed requests
5. Verify environment variables are loaded correctly

## 8. Security Considerations

### File Validation
- Always validate file types on both frontend and backend
- Implement file size limits
- Consider virus scanning for uploaded files

### Access Control
- Use RLS policies to control access
- Consider implementing user-specific folders
- Regularly audit storage permissions

### Cleanup
- Implement automatic cleanup of unused files
- Consider implementing file versioning
- Monitor storage usage and costs

## 9. Production Considerations

### Performance
- Consider implementing image optimization
- Use CDN for faster image delivery
- Implement lazy loading for images

### Monitoring
- Set up alerts for storage usage
- Monitor upload success/failure rates
- Track storage costs

### Backup
- Implement regular backups of important files
- Consider cross-region replication
- Document recovery procedures

## 10. Additional Features

### Image Optimization
Consider implementing:
- Automatic image resizing
- Format conversion (WebP)
- Quality optimization
- Thumbnail generation

### Advanced Features
- Image cropping and editing
- Multiple logo versions (different sizes)
- Logo approval workflow
- Logo usage analytics

This setup provides a robust foundation for handling company logo uploads in your B2B tender management platform. 

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dyddrbabqzcrnkmhfjov.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZGRyYmFicXpjcm5rbWhmam92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzOTk4MDIsImV4cCI6MjA4ODk3NTgwMn0.zUZDg_Gm2XC1YZA8aFrqkgHEm65W4qKK4gzeIUuYtpw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpload() {
  console.log('Attempting dummy upload to "equipment-images" bucket...');
  const dummyFile = Buffer.from('test');
  const { data, error } = await supabase.storage
    .from('equipment-images')
    .upload('test-connection.txt', dummyFile, {
      contentType: 'text/plain',
      upsert: true
    });

  if (error) {
    console.error('Upload failed:', error.message);
    if (error.message.includes('bucket not found')) {
      console.log('CONFIRMED: Bucket "equipment-images" does NOT exist.');
    } else if (error.message.includes('permission denied') || error.message.includes('new row violates row-level security')) {
      console.log('CONFIRMED: Bucket exists but RLS policies are missing or incorrect.');
    }
  } else {
    console.log('Upload SUCCESSFUL! Bucket and policies are working.');
    // Cleanup
    await supabase.storage.from('equipment-images').remove(['test-connection.txt']);
  }
}

testUpload();

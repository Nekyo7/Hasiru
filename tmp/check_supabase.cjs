
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dyddrbabqzcrnkmhfjov.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZGRyYmFicXpjcm5rbWhmam92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzOTk4MDIsImV4cCI6MjA4ODk3NTgwMn0.zUZDg_Gm2XC1YZA8aFrqkgHEm65W4qKK4gzeIUuYtpw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkStorage() {
  console.log('Checking storage buckets...');
  const { data, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.error('Error listing buckets:', error.message);
    return;
  }
  
  console.log('Available buckets:', data.map(b => b.name).join(', '));
  
  const bucketExists = data.some(b => b.name === 'equipment-images');
  if (bucketExists) {
    console.log('Bucket "equipment-images" exists.');
  } else {
    console.log('Bucket "equipment-images" is MISSING.');
  }

  console.log('\nChecking "equipment_reviews" table...');
  const { error: tableError } = await supabase.from('equipment_reviews').select('*').limit(1);
  if (tableError) {
    console.log('Table "equipment_reviews" check failed:', tableError.message);
  } else {
    console.log('Table "equipment_reviews" exists and is accessible.');
  }
}

checkStorage();

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars['VITE_SUPABASE_URL'] || '';
const supabaseKey = envVars['VITE_SUPABASE_ANON_KEY'] || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBucket() {
  console.log("Testing Supabase connection...");
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.error("Error listing buckets:", bucketsError);
  } else {
    console.log("Buckets:");
    buckets.forEach(b => console.log(` - ${b.name} (public: ${b.public})`));
  }

  console.log("\nTesting public URL generation...");
  const { data: urlData } = supabase.storage.from('equipment-images').getPublicUrl('test.png');
  console.log("Public URL test:", urlData.publicUrl);

  console.log("\nTesting upload...");
  // Create a dummy text file to test upload
  const fileContent = "dummy image data";
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const fileName = `test-${Date.now()}.txt`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('equipment-images')
    .upload(fileName, blob);
    
  if (uploadError) {
    console.error("Upload failed:", uploadError);
  } else {
    console.log("Upload successful:", uploadData);
  }
}

testBucket();

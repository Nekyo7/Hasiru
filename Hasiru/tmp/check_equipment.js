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

async function checkEquipment() {
  console.log("Fetching equipment...");
  const { data, error } = await supabase.from('equipment').select('*').order('created_at', { ascending: false }).limit(5);
  
  if (error) {
    console.error("Error fetching equipment:", error);
  } else {
    data.forEach(item => {
      console.log(`ID: ${item.id}, Name: ${item.name}, Image: ${item.image}`);
    });
  }
}

checkEquipment();

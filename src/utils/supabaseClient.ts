// src/utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ugacmfpwjhhulkmhicsf.supabase.co"; // Asegúrate de tener estas variables de entorno definidas
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnYWNtZnB3amhodWxrbWhpY3NmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzczMDUzNSwiZXhwIjoyMDQzMzA2NTM1fQ.MgrZHm-TFvRXWIylhPnI2yeMW9Yw8EY1n6CYMWw-VpA";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
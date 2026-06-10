import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('WARNING: SUPABASE_URL atau SUPABASE_ANON_KEY tidak ditemukan di environment variables.');
}

// Client standar untuk operasi biasa (mengikuti kebijakan Row Level Security / RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client admin untuk bypass RLS (gunakan dengan hati-hati hanya di backend server)
export const supabaseAdmin = supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null;

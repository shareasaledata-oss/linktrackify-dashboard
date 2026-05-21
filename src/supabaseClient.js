import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqqzbqunhzpjqijbetli.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcXpicXVuaHpwanFpamJldGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNjIzMDIsImV4cCI6MjA5NDkzODMwMn0.SdXvLT4bIAql3oe4KLZ6jSvP-ifGZN85GgOobBmD1Sw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
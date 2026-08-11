import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zxsmdvhvpdlqowzluooq.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_PUBLISHABLE_KEY_AQUI'; // Lembre de colar a chave sb_publishable_sm_... aqui

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
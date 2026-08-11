import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zxsmdvhvpdlqowzluooq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_sm_Q1nHXdCb2OHrHPFaePw_OE6GOCCC'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
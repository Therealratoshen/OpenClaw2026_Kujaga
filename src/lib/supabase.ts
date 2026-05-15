import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfhxirestwsqlbqgdafpsh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmeHhpcmVzd3NxbGJqZGFmcHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MzU0MDUsImV4cCI6MjA5NDQxMTQwNX0.mwZSto7srb6UtqlCH81gg25HkhZIVMaTCBoVz-xNdUA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
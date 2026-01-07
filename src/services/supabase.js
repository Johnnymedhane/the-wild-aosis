

import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://linikxicykduspangbxu.supabase.co'

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpbmlreGljeWtkdXNwYW5nYnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMzEzOTksImV4cCI6MjA3NDYwNzM5OX0.nEwa5ucCHQgXrgJc0TkxaqmzPNEH1npsq7Idl3NNorQ"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
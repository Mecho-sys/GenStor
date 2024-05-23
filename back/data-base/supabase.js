import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: "../.env" });

/* const supabase = createClient(supabaseUrl, supabaseKey);
*/export default function supabase(){
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
   
    try {
        const connection = createClient(supabaseUrl, supabaseKey);
        return connection;
    } catch (error) {
        console.error('Error creating connection:', error);
        return error;
    }
}
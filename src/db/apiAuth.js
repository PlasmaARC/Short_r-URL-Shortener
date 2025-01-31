//We are creating an API Login Request from the Supabase database.

import supabase from "./supabase";

//Creating an Login logic
export async function login({email,password}) {
   const {data,error} = await supabase.auth.signInWithPassword({
    email,
    password,
   });

   if(error) throw new Error(error.message)
    return data;
}
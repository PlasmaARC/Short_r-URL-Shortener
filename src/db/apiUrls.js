
import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getUrls(user_id) {
    const { data, error } = await supabase.from("urls").select("*").eq("user_id", user_id);

    if (error) {
        console.error(error.message)
        throw new Error("Unable to load URLs");
    }


    return data;
}

export async function deleteUrls(id) {
    const { data, error } = await supabase.from("urls").delete().eq("id", id);

    if (error) {
        console.error(error.message)
        throw new Error("Unable to load URLs");
    }


    return data;
}

export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
    const short_url = Math.random().toString(36).slice(2, 6);
    const fileName = `qr-${short_url}`;

    const { error: storageError } = await supabase.storage
        .from("qr")
        .upload(fileName, qrcode, {
            contentType: "img"
        });

    if (storageError) throw new Error(storageError.message);

    // const qr = `${supabaseUrl}/storage/v1/object/public/qr/${fileName}`;

    // After successful upload:
    const { data: signedUrlData, error: signError } = await supabase
        .storage
        .from("qr")
        .createSignedUrl(fileName, 2592000); // URL valid for 1 month

    if (signError) throw new Error(signError.message);

    const qr = signedUrlData.signedUrl;


    const { data, error } = await supabase
        .from("urls")
        .insert([
            {
                title,
                user_id,
                original_url: longUrl,
                custom_url: customUrl || null,
                short_url,
                qr,
            },
        ])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Error creating short URL");
    }

    return data;
}

export async function getLongURL(id) {
    const { data, error } = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

    if (error) {
        console.error(error.message)
        throw new Error("Error Fetching Short Link");
    }


    return data;
}

const parser = new UAParser();
 
export const storeClicks = async ({id, originalUrl}) => {
    try {
      const res = parser.getResult();
      const device = res.type || "desktop"; // Default to desktop if type is not detected
  
      const response = await fetch("https://ipapi.co/json");
      const {city, country_name: country} = await response.json();
  
      // Record the click
      await supabase.from("clicks").insert({
        url_id: id,
        city: city,
        country: country,
        device: device,
      });
  
      // Redirect to the original URL
      window.location.href = originalUrl;
    } catch (error) {
      console.error("Error recording click:", error);
    }
  };

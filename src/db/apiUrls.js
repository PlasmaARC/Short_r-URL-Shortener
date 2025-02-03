

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
    if (!id || typeof id !== "number") {
        throw new Error("Invalid ID provided for deletion");
    }

    const { data, error } = await supabase.from("urls").delete().eq("id", id);
    console.log("Supabase Response: ", data, error);

    if (error) {
        console.error("Supabase delete error:", error.message);  // Log the full error message
        throw new Error("Unable to delete URL");
    }

    if (!data || data.length === 0) {
        throw new Error("No URL found with the given ID");
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

export async function getUrl({ id, user_id }) {
    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("id", id)
        .eq("user_id", user_id)
        .single()

    if (error) {
        console.error(error.message)
        throw new Error("Short Url not Found");
    }


    return data;
}

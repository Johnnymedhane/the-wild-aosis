import supabase, { supabaseUrl } from "./supabase"


export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")

  if (error) {
    console.error(error)
    throw new Error("Error fetching cabins")
  }

  return data
}

export async function createEditCabin(newCabin, id) {

const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

 const imageName= `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
 );

 const imagePath = hasImage ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/edit cabin
  let query = supabase
    .from('cabins');

    // A) CREATE 
 if(!id)  query = query.insert([{ ...newCabin, image: imagePath }])
   

   
   

    // B) EDIT

  if(id) query = query.update({ ...newCabin, image: imagePath })
   .eq('id', id)
    

  const {data, error} = await query .select().single();

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(`Cabin could not be created: ${error.message}`);
  }

  // 2. upload the image to the "images" table
  if (hasImage) return data;
  
  const { error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image)

  // 3. if there was an error uploading the image, delete the cabin we just created

  if (storageError) {
  await supabase.from('cabins').delete().eq('id', data.id);

    console.error("Storage error:", storageError);
    throw new Error("Image could not be uploaded and cabin not created");
  }
  
  return data;
}
export async function deleteCabin(cabinId) {
 
const { data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', cabinId)

  if (error) {
    console.error(error)
    throw new Error("cabin could not be deleted")

  }

  return data
}


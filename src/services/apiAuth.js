import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error("Login failed: " + error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) throw new Error("Login failed: " + error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Logout failed: " + error.message);
}

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error("Signup failed: " + error.message);
  return data;
}

export async function updateCurrentUserData({ fullName, password, avatar }) {
  // 1. update password or fullName 
 let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = {  data: { fullName } };
  
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error("User data could not be updated: " + error.message);
  if (!avatar) return data;
  
  
  // 2.upload avatar image
  const fileNme = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase
    .storage
    .from('avatars')
    .upload(fileNme, avatar);
  if (uploadError) throw new Error("Avatar image could not be uploaded: " + uploadError.message);
  
  // 3. update avatar in the user
  
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileNme}` 
  }
  });
  if (error2) throw new Error("User avatar could not be updated: " + error2.message);
  return updatedUser;
}

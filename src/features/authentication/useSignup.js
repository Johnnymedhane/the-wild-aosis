import { useMutation } from "@tanstack/react-query"
import { signup as signupApi } from "../../services/apiAuth"
import toast from "react-hot-toast";

function useSignup() {
 const {mutate: signup, isLoading, error} = useMutation({
  mutationFn: ({email, password, fullName}) => signupApi({email, password, fullName}),
onSuccess: () => {
  toast.success("Account successfully created! Please verfy the new account from the user's email address.");
},
onError: (err) => {
  console.error("Signup failed:", err.message);
}
 });

  return { signup, isLoading, error };
}

export default useSignup
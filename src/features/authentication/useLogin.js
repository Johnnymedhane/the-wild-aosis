import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData({ queryKey: ["user"] }, user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      +console.log("Error:", err.message);
      toast.error("Provided email or password is incorrect");
    },
  });
  return { login, isLoading };
}

export default useLogin;

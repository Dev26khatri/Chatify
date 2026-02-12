import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Login Successfully");
      navigate("/");
    },
  });
  return { error, isPending, loginMutation: mutate };
};
export default useLogin;

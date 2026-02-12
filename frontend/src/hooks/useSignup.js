import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
      toast.success("Signup Successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { isPending, error, signupMutation: mutate };
};
export default useSignup;

import { getAuthUser } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
const useAuthUser = () => {
  const authUserData = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
  return {
    isLoading: authUserData.isLoading,
    authUser: authUserData.data?.user,
  };
};

export default useAuthUser;

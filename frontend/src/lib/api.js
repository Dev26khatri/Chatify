import { axiosInstance } from "./axios";
export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};
export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
export const getAuthUser = async () => {
  //We use the try and catch block for when we are logout so we have not issue
  try {
    let res = await axiosInstance.get(`/auth/me`);
    return res.data;
  } catch (error) {
    //when logout triggers so we are redirect to the homepage so home page have an security
    //Like you are authenticated so you can access the home page otherwise no
    //so it will return the null it means false so you are not authenticated
    console.log("Error from getAuthUser", error);
    return null;
  }
};
export const completeOnboarding = async (onboardingData) => {
  const response = await axiosInstance.post("/auth/onboarding", onboardingData);
  return response.data;
};

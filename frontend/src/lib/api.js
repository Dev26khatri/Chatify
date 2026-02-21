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

export const getUserFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
};
export const getRecommendedUser = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};
export const getOutgoingFriends = async () => {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
};
export const sendFriendReq = async (userId) => {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
};
export const getFriendRequests = async () => {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
};
export const acceptFriendRequest = async (requestId) => {
  const response = await axiosInstance.put(
    `/users/friend-request/${requestId}/accept`,
  );

  return response.data;
};
export const getStreamToken = async () => {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
};

export const rejectRequest = async (rejectID) => {
  const response = await axiosInstance.delete(
    `/users/friend-request/${rejectID}/reject`,
  );
  return response.data;
};

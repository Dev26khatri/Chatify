import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getStreamToken } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const authUser = useAuthUser();

  const { data: tokenData, isLoading } = useQuery({
    queryKey: ["getStreamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });
  const token = tokenData?.token;

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser?.authUser._id || !callId) return;
      try {
        const user = {
          id: authUser.authUser._id,
          name: authUser.authUser.fullName,
          image: authUser.authUser.profilePic,
        };
        const videoCleint = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token,
        });
        const call = videoCleint.call("default", callId);
        await call.join({ create: true });
        console.log("Call Joind Successfully");
        toast.success("Connected to the call successfully!");
        setClient(videoCleint);
        setCall(call);
      } catch (error) {
        console.error("Error initializing call:", error);
        toast.error("Failed to connect to the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
    return () => {
      call?.leave();
      client?.disconnectUser();
    };
  }, [tokenData?.token, authUser?.authUser._id, callId]);
  if (isLoading || isConnecting) return <PageLoader />;
  console.log("Client:", client);
  console.log("Call:", call);
  console.log("Call ID:", callId);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full"></div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();
  if (callingState === CallingState.LEFT) return navigate(`/chat`);
  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;

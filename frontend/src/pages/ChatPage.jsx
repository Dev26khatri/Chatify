import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetedID } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const authUser = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["getStreamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser.authUser, //this will run when only authUser is available
  });

  useEffect(() => {
    if (!tokenData?.token || !authUser?.authUser?._id || !targetedID) return;
    const initChat = async () => {
      try {
        console.log("Initilizing chat client...");
        const client = StreamChat.getInstance(STREAM_API_KEY);
        await client.connectUser(
          {
            id: authUser.authUser._id,
            name: authUser.authUser.fullName,
            image: authUser.authUser.profilePic,
          },
          tokenData.token,
        );
        const channelID = [authUser.authUser._id, targetedID].sort().join("-");
        const currChannel = client.channel("messaging", channelID, {
          members: [authUser.authUser._id, targetedID],
        });
        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.log("Error initializing chat client", error);
        toast.error("Could not connect to chat . Please try again");
      } finally {
        setLoading(false);
      }
    };
    initChat();
  }, [tokenData?.token, authUser.authUser._id, targetedID]);
  if (loading || !chatClient || !channel) {
    return <ChatLoader />;
  }
  const handleVideoCall = () => {
    if (channel) {
      const callURL = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `Join my video call: ${callURL}`,
      });
      toast.success("Video call link sent Successfully!");
    }
  };
  return (
    <div className="h-screen  bg-green-50">
      <Chat client={chatClient} className="flex">
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
          </div>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;

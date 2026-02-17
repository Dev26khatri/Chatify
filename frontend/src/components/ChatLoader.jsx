import { LoaderIcon } from "lucide-react";
import React from "react";

const ChatLoader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center p-2">
        <LoaderIcon className="loading loading-spinner size-7 text-primary" />
        <p className="opacity-75 text-xl">Connecting to the chat....</p>
      </div>
    </div>
  );
};

export default ChatLoader;

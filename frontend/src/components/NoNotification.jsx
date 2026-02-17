import { BellIcon, BellOff } from "lucide-react";
import React from "react";

const NoNotification = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 ">
      <div className="size-16 bg-base-300 rounded-full flex items-center justify-center">
        <BellOff className="size-10 text-base-content opacity-80" />
      </div>
      <h2 className="text-2xl font-bold mt-2">No Notification Yet</h2>
      <p className="opacity-60 font-semibold">
        When you receive friend requests or message , they'll appear here
      </p>
    </div>
  );
};

export default NoNotification;

import { VideoIcon } from "lucide-react";
import React from "react";

const CallButton = ({ handleVideoCall }) => {
  return (
    <div className="  absolute  top-2 right-2 z-10 text-primary p-1 flex items-center justify-end">
      <button
        className="btn btn-sm btn-outline  btn-success text-white"
        onClick={handleVideoCall}
      >
        <VideoIcon className="size-5" />
      </button>
    </div>
  );
};

export default CallButton;

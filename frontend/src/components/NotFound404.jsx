import React from "react";

const NotFound404 = () => {
  return (
    <div className="card h-screen bg-base-200 flex justify-center items-center p-5 text-center">
      <h3 className="text-8xl animate-pulse  font-semibold  text-error">404</h3>
      <p className="opacity-70 text-xl font-bold     text-base-content">
        PAGE NOT FOUND
      </p>
    </div>
  );
};

export default NotFound404;

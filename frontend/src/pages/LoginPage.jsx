import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShipWheel } from "lucide-react";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { isPending, error, loginMutation } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };
  return (
    <div
      className="h-screen flex justify-center items-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25  flex flex-col lg:flex-row w-full max-w-3xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <div className="mb-4  flex items-center justify-start">
            <ShipWheel className="mr-4 size-9" />
            <span className="text-3xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Chatify
            </span>
          </div>
          <div className="flex flex-col mb-4  ">
            <h1 className="text-2xl font-bold tracking-wider">Welcom Back!</h1>
            <p className="text-sm  opacity-60">
              Sign in to your account to continue your language journey
            </p>
          </div>
          {/* Error Message Display  */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}
          {/* Email and Password */}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="flex felx-col space-y-2"></div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  placeholder="hello@gmail.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered "
                  placeholder="*******"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary w-full mt-4">
                {isPending ? (
                  <>
                    <span className="loading loading-spinner mr-2 loading-xs"></span>
                    Signing in....
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
              <div className="text-center mt-4">
                <p className="text-sm">
                  Don't have an account{""}
                  <Link to="/signup" className="ml-1  link-info">
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden w-full lg:flex lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* illustration */}
            <div className="realtive aspect-square max-w-sm mx-auto">
              <img src="Video call-bro.png" alt="Videcall Image" />
            </div>
            <div className="p-2 text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                {" "}
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice Coverstations , make firends , and improve your
                language skills togather
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

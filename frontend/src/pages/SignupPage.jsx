import React, { useState } from "react";
import { ShipWheel } from "lucide-react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, isError, signupMutation } = useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };
  // console.log(isError.response);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 ">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500">
        {/* LEFT SIDE - FORM */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheel className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Chatify
            </span>
          </div>
          {/* Error Message */}
          {isError && (
            <div className="alert alert-error">
              <span className="text-white">
                {error?.response?.data?.message}
              </span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FULLNAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="******"
                      className="input input-bordered w-full   "
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <span className="form-control">
                    <label className="label w-auto cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </span>
                </div>

                <button
                  disabled={isPending}
                  className="btn btn-primary w-full"
                  type="submit"
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
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

export default SignupPage;

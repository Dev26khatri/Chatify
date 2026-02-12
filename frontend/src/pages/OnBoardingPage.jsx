import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  CameraIcon,
  LoaderIcon,
  MapPinIcon,
  ShipWheel,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "../constant";

const OnBoardingPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { authUser } = useAuthUser();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    profilePic: authUser?.profilePic || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile Onboarding Successfull!");
      navigate("/");
      console.log("navigate active:", navigate);
    },
    onError: (error) => {
      console.log("FULL ERROR:", error);
      console.log("BACKEND MESSAGE:", error.response?.data);
      console.log("STATUS:", error.response?.status);
      toast.error(error.response?.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Avatar Changed Successfullys!");
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-lg ">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl mb-4 font-bold text-center  ">
            Complete Your Profile
          </h1>
          {/* Profile Pic */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="size-32 rounded-full bg-base-300 overflow-hidden">
              {/* Image Prview */}
              {formState.profilePic ? (
                <>
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover "
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <CameraIcon className="size-12 text-base-content opacity-40" />
                </div>
              )}
            </div>
            <p className="opacity-70">It may take time to load</p>
            {/* Genrate Random Avatar  */}
            <div className="flex items-center gap-2">
              <button onClick={handleRandomAvatar} className="btn btn-accent">
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avtar
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {/* FullName  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>
            {/* Bio */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24"
                placeholder="Tell something about your self "
              />
            </div>
            {/* Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Native Language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  className="select select-bordered w-full"
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select Your Native Language</option>
                  {LANGUAGES.map((lang) => {
                    return (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* Learning Language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  className="select select-bordered w-full"
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select Your Learning Language</option>
                  {LANGUAGES.map((lang) => {
                    return (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 right-5 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  className="input input-bordered w-full"
                  placeholder="City , Country"
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Submit Button */}
            <button
              className="btn btn-primary w-full mt-5"
              disabled={isPending}
            >
              {!isPending ? (
                <>
                  <ShipWheel className="size-6 mr-2" />
                  Compelete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;

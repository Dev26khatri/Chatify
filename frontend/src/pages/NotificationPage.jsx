import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { use } from "react";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import toast from "react-hot-toast";
import { BellIcon, ClockIcon, MessageSquare, UserCheck } from "lucide-react";
import { LANGUAGE_TO_FLAG } from "../constant";
import NoNotification from "../components/NoNotification";

const NotificationPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast.success("Friend Request Accepted");
    },
  });
  // console.log("Friend Requests", friendRequests);
  const incomingRequests = friendRequests?.incomingReq || [];
  const acceptedRequests = friendRequests?.acceptedReq || [];
  console.log("Accepted Requests", acceptedRequests);
  // console.log("Incoming Requests", incomingRequests);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl ">
        <h1 className="text-3xl font-bold tracking-tight">Notification</h1>
        {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
          <NoNotification />
        )}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg " />
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <div>
                <section className="space-y-3">
                  <div className="flex items-center gap-2 mt-3 mb-2 p-2">
                    <UserCheck className="size-5 text-success" />
                    <h2 className=" font-semibold">Incoming Requests</h2>
                    <div className="px-4 rounded-lg text-center flex items-center justify-center  size-5 text-base-300 bg-green-600">
                      <p className="font-semibold font-mono">
                        {incomingRequests.length}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {incomingRequests.map((req) => (
                      <div key={req.sender._id}>
                        <div className="card bg-base-200 shadow-md hover:shadow-lg mt-5 transition-all">
                          <div className="card-body p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center ">
                                <div className="avatar rounded-full bg-base-300 size-10">
                                  <img
                                    src={req.sender.profilePic}
                                    alt={req.sender.fullName}
                                  />
                                </div>
                                <div className="ml-2">
                                  <h3 className="hover:underline">
                                    {req.sender.fullName}
                                  </h3>
                                  <div className="flex flex-col sm:justify-between sm:flex-row gap-2 mb-1 cursor-pointer">
                                    <span className="flex badge badge-primary text-xs w-fit rounded-full p-3 py-1.5 items-center whitespace-nowrap">
                                      <span className="size-4 mr-2 mt-1">
                                        {getLanguageFlag(
                                          req.sender.nativeLanguage,
                                        )}
                                      </span>
                                      <p className="capitalize">
                                        Native: {req.sender.nativeLanguage}
                                      </p>
                                    </span>

                                    <span className="flex badge badge-outline text-xs w-fit rounded-full p-3 py-1.5 items-center whitespace-nowrap">
                                      <span className="size-4 mr-2 mt-1">
                                        {getLanguageFlag(
                                          req.sender.learningLanguage,
                                        )}
                                      </span>
                                      <p className="capitalize">
                                        Learning : {req.sender.learningLanguage}
                                      </p>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button
                                className="btn btn-primary font-semibold btn-sm"
                                onClick={() => acceptRequestMutation(req._id)}
                                disabled={isPending}
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
            {/* Accepted Request Notification */}
            <div>
              {acceptedRequests.length > 0 && (
                <section>
                  <h2 className="flex items-center gap-2 mt-2 mb-2 ">
                    <BellIcon className="size-5 text-success" />
                    New Connection
                  </h2>
                  {acceptedRequests.map((req) => (
                    <div className="card bg-base-200 shadow-md hover:shadow-lg mt-5 transition-all">
                      <div className="card-body  p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center text-sm">
                            <div className="avatar rounded-full overflow-hidden bg-base-300 size-10 border border-base-content hover:border-green-400  hover:scale-105 transition-all duration-500">
                              <img
                                src={req.sender.profilePic}
                                alt={req.sender.fullName}
                                className="object-cover "
                              />
                            </div>
                            <div className="flex-1 ml-4 ">
                              <h3 className="hover:underline text-lg font-semibold  ">
                                {req.sender.fullName}
                              </h3>
                              <p>
                                {req.sender.fullName} accepted your friend
                                request!
                              </p>
                              <p className="flex items-center">
                                <ClockIcon className="size-3 mr-1 text-base-content" />
                                Rencently
                              </p>
                            </div>
                          </div>
                          <span className="badge badge-success flex items-center sm:text-sm md:text-xs lg:text-sm  ">
                            <MessageSquare className="size-3 mr-2" />
                            New Friend
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];
  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/48x36/${countryCode}.png`}
        alt={`${langLower} flag`}
      />
    );
  }
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  getOutgoingFriends,
  getRecommendedUser,
  getUserFriends,
  sendFriendReq,
} from "../lib/api";
import { UsersIcon } from "lucide-react";
import { Link } from "react-router";
import FriendCard from "../components/FriendCard";
import NotFoundFriend from "../components/NotFoundFriend";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestIds, setOutGoingRequestIds] = useState(new Set());
  const [pendingState, setPendingState] = useState(null);

  const { data: friends = [], isLoading: friendLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  const { data: recommendedUsers = [], isLoading: recommendedLoading } =
    useQuery({
      queryKey: ["recommendedUser"],
      queryFn: getRecommendedUser,
    });
  const { data: outgoingFriendReq = [], isLoading: outgoingLoading } = useQuery(
    {
      queryKey: ["outgoingFriendReqs"],
      queryFn: getOutgoingFriends,
    },
  );

  const { mutate: sendRequestMutation, isPending: isSendMutation } =
    useMutation({
      mutationFn: sendFriendReq,
      onMutate: (userId) => {
        setPendingState(userId);
      },
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
    });
  // console.log(sendFriendReq.onSuccess);
  useEffect(() => {
    const outgoingId = new Set();
    if (outgoingFriendReq && outgoingFriendReq.length > 0) {
      outgoingFriendReq.forEach((req) => {
        outgoingId.add(req.recipient._id);
      });
      setOutGoingRequestIds(outgoingId);
    }
  }, [outgoingFriendReq]);

  return (
    <div className="p-4 sm:p-4 lg:p-6">
      <div className="container mx-auto space-y-10">
        <div className="flex justify-between items-center ">
          <h2 className="sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter">
            Your Friends
          </h2>
          <Link
            to="/notification"
            className="flex items-center gap-3 btn btn-outline transition-all duration-700 text-xs "
          >
            <UsersIcon className="size-4" />
            <p className="font-semibold tracking-wide">Friend Requests</p>
          </Link>
        </div>
        {friendLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NotFoundFriend />
        ) : (
          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} Frienduser={friend} />
            ))}
          </div>
        )}
        <section>
          <div className="mb-6 sm:mb-8 ">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover Perfect Language Exchange Partners Based On Your
                  Profile
                </p>
              </div>
            </div>
          </div>
          {recommendedLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center capitalize">
              <h3 className="text-2xl font-semibold ">
                no recommendations available
              </h3>
              <p className="text-md opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestIds.has(user._id);
                // console.log(hasRequestBeenSent);

                return (
                  <FriendCard
                    key={user._id}
                    RecommendedUsers={user}
                    HasRequestBeenSent={hasRequestBeenSent}
                    SendRequestMutation={sendRequestMutation}
                    IsPending={pendingState}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;

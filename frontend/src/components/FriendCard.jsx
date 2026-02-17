import React from "react";
import { LANGUAGE_TO_FLAG } from "../constant";
import { Link } from "react-router";
import { CheckCircle, CheckCircleIcon, MapPin, UserPlus } from "lucide-react";

// const FriendCard = ({
//   Frienduser,
//   RecommendedUsers,
//   HasRequestBeenSent,
//   SendRequestMutation,
//   IsPending,
// }) => {
//   console.log("Frienduser", Frienduser);
//   console.log(HasRequestBeenSent);
//   //Do Map for this all users becuase this is not for a specific so consider this
//   return (
//     <div className="card bg-base-200 hover:shadow-md transition-all cursor-pointer  ">
//       {Frienduser && (
//         <div className="card-body p-4">
//           {/* User Info*/}
//           <div className="flex items-center gap-3 mb-3">
//             <div className="avatar size-12 bg-base-300 rounded-full overflow-hidden">
//               <img src={Frienduser.profilePic} alt={Frienduser.fullName} />
//             </div>
//             <div className="font-semibold truncate  ">
//               <h3 className="hover:underline">{Frienduser.fullName}</h3>
//             </div>
//           </div>
//           <div
//             className="flex flex-col sm:justify-between sm:flex-row
//           gap-2 mb-1 cursor-pointer"
//           >
//             <span className="flex  badge badge-primary text-xs w-fit rounded-full p-3 py-1.5  items-center whitespace-nowrap  ">
//               <span className=" size-4 mr-2  mt-1">
//                 {getLanguageFlag(Frienduser.nativeLanguage)}
//               </span>
//               <p className="capitalize">Native: {Frienduser.nativeLanguage}</p>
//             </span>
//             <span className=" flex badge badge-outline text-xs w-fit rounded-full p-3 py-1.5  items-center whitespace-nowrap">
//               <span className="size-4 mr-2 mt-1">
//                 {getLanguageFlag(Frienduser.learningLanguage)}
//               </span>
//               <p className="capitalize">
//                 Learning : {Frienduser.learningLanguage}
//               </p>
//             </span>
//           </div>

//           <Link
//             to={`/chat/${Frienduser._id}`}
//             className="btn btn-ghost btn-outline font-semibold tracking-wider"
//           >
//             Message
//           </Link>
//         </div>
//       )}
//       {RecommendedUsers && (
//         <div className="card-body p-4">
//           {/* User Info*/}
//           <div className="flex items-center gap-3 mb-3">
//             <div className="avatar size-12 bg-base-300 rounded-full overflow-hidden">
//               <img
//                 src={RecommendedUsers.profilePic}
//                 alt={RecommendedUsers.fullName}
//               />
//             </div>
//             <div className="font-semibold truncate  ">
//               <h3 className="hover:underline">{RecommendedUsers.fullName}</h3>
//               <div>
//                 {RecommendedUsers.location && (
//                   <p className="text-xs flex items-center">
//                     <MapPin className="size-3 mr-1" />
//                     {RecommendedUsers.location}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div
//             className="flex flex-col sm:justify-between sm:flex-row
//           gap-2 mb-1 cursor-pointer"
//           >
//             <span className="flex  badge badge-primary text-xs w-fit rounded-full p-3 py-1.5  items-center whitespace-nowrap  ">
//               <span className=" size-4 mr-2  mt-1">
//                 {getLanguageFlag(RecommendedUsers.nativeLanguage)}
//               </span>
//               <p className="capitalize">
//                 Native: {RecommendedUsers.nativeLanguage}
//               </p>
//             </span>
//             <span className=" flex badge badge-outline text-xs w-fit rounded-full p-3 py-1.5  items-center whitespace-nowrap">
//               <span className="size-4 mr-2 mt-1">
//                 {getLanguageFlag(RecommendedUsers.learningLanguage)}
//               </span>
//               <p className="capitalize">
//                 Learning : {RecommendedUsers.learningLanguage}
//               </p>
//             </span>
//           </div>
//           <div>
//             {RecommendedUsers.bio && (
//               <p className="text-xs p-1 px-2 capitalize opacity-90">
//                 - {RecommendedUsers.bio}
//               </p>
//             )}
//           </div>
//           <button
//             className={`btn w-full mt-2 ${HasRequestBeenSent ? `btn-disabled` : `btn-primary`}`}
//             onClick={() => SendRequestMutation(RecommendedUsers._id)}
//             disabled={HasRequestBeenSent || IsPending}
//           >
//             {HasRequestBeenSent ? (
//               <>
//                 <CheckCircleIcon className="size-5 mr-1" />
//                 Request Sent
//               </>
//             ) : (
//               <>
//                 <UserPlus className="size-5 mr-1" />
//                 {IsPending ? "Sending..." : "Send Friend Request"}
//               </>
//             )}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

const FriendCard = ({
  Frienduser,
  RecommendedUsers,
  HasRequestBeenSent,
  SendRequestMutation,
  IsPending,
}) => {
  // ❌ Removed console.log to avoid re-render noise
  // console.log(HasRequestBeenSent);

  return (
    <div className="card bg-base-200 hover:shadow-md transition-all cursor-pointer">
      {Frienduser && (
        <div className="card-body p-4">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="avatar size-12 bg-base-300 rounded-full overflow-hidden">
              <img src={Frienduser.profilePic} alt={Frienduser.fullName} />
            </div>
            <div className="font-semibold truncate">
              <h3 className="hover:underline">{Frienduser.fullName}</h3>
            </div>
          </div>

          <div className="flex flex-col sm:justify-between sm:flex-row gap-2 mb-1 cursor-pointer">
            <span className="flex badge badge-primary text-xs w-fit rounded-full p-3 py-1.5 items-center whitespace-nowrap">
              <span className="size-4 mr-2 mt-1">
                {getLanguageFlag(Frienduser.nativeLanguage)}
              </span>
              <p className="capitalize">Native: {Frienduser.nativeLanguage}</p>
            </span>

            <span className="flex badge badge-outline text-xs w-fit rounded-full p-3 py-1.5 items-center whitespace-nowrap">
              <span className="size-4 mr-2 mt-1">
                {getLanguageFlag(Frienduser.learningLanguage)}
              </span>
              <p className="capitalize">
                Learning : {Frienduser.learningLanguage}
              </p>
            </span>
          </div>

          {/* ✅ FIX: id → _id */}
          <Link
            to={`/chat/${Frienduser._id}`}
            className="btn btn-ghost btn-outline font-semibold tracking-wider"
          >
            Message
          </Link>
        </div>
      )}

      {RecommendedUsers && (
        <div className="card-body p-4">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="avatar size-12 bg-base-300 rounded-full overflow-hidden">
              <img
                src={RecommendedUsers.profilePic}
                alt={RecommendedUsers.fullName}
              />
            </div>
            <div className="font-semibold truncate">
              <h3 className="hover:underline">{RecommendedUsers.fullName}</h3>

              {RecommendedUsers.location && (
                <p className="text-xs flex items-center">
                  <MapPin className="size-3 mr-1" />
                  {RecommendedUsers.location}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:justify-between sm:flex-row gap-2 mb-1 cursor-pointer">
            <span className="flex badge badge-primary text-xs w-fit rounded-full p-3 py-1.5 items-center whitespace-nowrap">
              <span className="size-4 mr-2 mt-1">
                {getLanguageFlag(RecommendedUsers.nativeLanguage)}
              </span>
              <p className="capitalize">
                Native: {RecommendedUsers.nativeLanguage}
              </p>
            </span>

            <span className="flex badge badge-outline text-xs w-fit rounded-full p-3 py-1.5 items-center whitespace-nowrap">
              <span className="size-4 mr-2 mt-1">
                {getLanguageFlag(RecommendedUsers.learningLanguage)}
              </span>
              <p className="capitalize">
                Learning : {RecommendedUsers.learningLanguage}
              </p>
            </span>
          </div>

          {RecommendedUsers.bio && (
            <p className="text-xs p-1 px-2 capitalize opacity-90">
              - {RecommendedUsers.bio}
            </p>
          )}

          <button
            className={`btn w-full mt-2 ${
              HasRequestBeenSent ? "btn-disabled" : "btn-primary"
            }`}
            onClick={() => SendRequestMutation(RecommendedUsers._id)}
            disabled={HasRequestBeenSent || IsPending}
          >
            {/* ✅ FIX: remove === true and wrong pending source */}
            {HasRequestBeenSent ? (
              <>
                <CheckCircleIcon className="size-5 mr-1" />
                Request Sent
              </>
            ) : (
              <>
                <UserPlus className="size-5 mr-1" />
                {IsPending ? "Sending..." : "Send Friend Request"}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendCard;

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

{
  /* <div className="card bg-base-200 hover:shadow-md transition-all cursor-pointer  ">
  <div className="card-body p-4">
    <div className="flex items-center gap-3 mb-3">
      <div className="avatar size-12 bg-base-300 rounded-full overflow-hidden">
        <img src={user.profilePic} alt={user.fullName} />
      </div>
      <div className="font-semibold truncate  ">
        <h3 className="hover:underline">{user.fullName}</h3>
        <div>
          {user.location && (
            <p className="text-xs flex items-center">
              <MapPin className="size-3 mr-1" />
              {user.location}
            </p>
          )}
        </div>
      </div>
    </div>
    <div
      className="flex flex-col sm:justify-between sm:flex-row 
          gap-2 mb-1 cursor-pointer"
    >
      <span className="flex  badge badge-primary text-xs w-fit rounded-full p-3 py-1.5  items-center whitespace-nowrap  ">
        <span className=" size-4 mr-2  mt-1">
          {getLanguageFlag(user.nativeLanguage)}
        </span>
        <p className="capitalize">Native: {user.nativeLanguage}</p>
      </span>
      <span className=" flex badge badge-outline text-xs w-fit rounded-full p-3 py-1.5  items-center whitespace-nowrap">
        <span className="size-4 mr-2 mt-1">
          {getLanguageFlag(user.learningLanguage)}
        </span>
        <p className="capitalize">Learning : {user.learningLanguage}</p>
      </span>
    </div>
    <div>
      {user.bio && (
        <p className="text-xs p-1 px-2 capitalize opacity-90">- {user.bio}</p>
      )}
    </div>

    {!user.bio ? (
      <Link
        to={`/chat/${user.id}`}
        className="btn btn-ghost btn-outline font-semibold tracking-wider"
      >
        Message
      </Link>
    ) : (
      <>
        {user.bio ? (
          <div className="flex items-center ">
            <button onClick={() => SendRequestMutation(user._id)}>
              {HasRequestBeenSent ? (
                <>
                  <CheckCircleIcon />
                  Request Sent
                </>
              ) : (
                <>
                  <UserPlus />
                  Send Friend Request
                </>
              )}
            </button>
          </div>
        ) : (
          "Message"
        )}
      </>
    )}
  </div>
</div>; */
}

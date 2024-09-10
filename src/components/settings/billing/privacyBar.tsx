import { useState } from "react";
import axios from "@/utils/axios";
import useAuth from "@/hooks/useAuth";

export function PrivacyBar({
  is_private,
}: {
  is_private: boolean | undefined;
}) {
  const { setUser } = useAuth();
  const [privacy, setPrivacy] = useState(is_private);
  const handlePrivacy = async () => {
    const response = await axios.put("/api/users/account/update-user/", {
      is_private: !privacy,
    });
    setPrivacy(!privacy);
    setUser(response.data.user);
  };
  return (
    <div className="space-y-2">
      <div className="text-base font-semibold ">Privacy</div>
      <div className="border-2 border-gray-3 rounded-50 p-1 w-44">
        {privacy ? (
          <div className="flex justify-start gap-2 items-center ">
            <div className="text-white bg-blue-1 rounded-50 py-4 w-36 text-center text-sm">
              Public
            </div>
            <div
              className="text-gray-1 cursor-pointer rounded-50 py-4 w-36  text-center text-sm font-normal"
              onClick={() => handlePrivacy()}
            >
              Private
            </div>
          </div>
        ) : (
          <div className="flex justify-start gap-2 items-center ">
            <div
              className="text-gray-1 rounded-50 py-4 w-36 text-center text-sm cursor-pointer"
              onClick={() => handlePrivacy()}
            >
              Public
            </div>
            <div className="text-gray-2 bg-blue-1 cursor-pointer rounded-50 py-4 w-36 text-center text-sm">
              Private
            </div>
          </div>
        )}
      </div>
      {privacy ? (
        <div className="text-gray-4 font-medium">
          You’re profile will only be visible to everyone
        </div>
      ) : (
        <div className="text-gray-4 font-medium">
          You’re profile will only be visible to you
        </div>
      )}
    </div>
  );
}

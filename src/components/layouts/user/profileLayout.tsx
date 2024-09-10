import React from "react";
import ProfileCard from "@/components/user/profileCard";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-12 pt-12 px-[45.5px] ml-20 w-[1407px]">
      {children}
    </div>
  );
};

export default ProfileLayout;

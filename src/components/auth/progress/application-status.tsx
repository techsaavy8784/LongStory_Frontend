import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import { use, useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import ApplicationAccepted from "@/components/auth/application-accepted";
import StepBar from "@/components/common/stepBar";
import axios from "@/utils/axios";
import AuthTokenCheckLayout from "@/components/layouts/user/authTokenCheckLayout";
import { checkToken, getSecond } from "@/utils/jwt";
import { User } from "@/types/user";
const stepBarItemList: string[] = [
  "Application Submitted",
  "Awaiting Review",
  "Application Accepted",
];
const ApplicationStatus = () => {
  const router = useRouter();
  const { user, setUser, updateProfile } = useAuth();
  const [applicationStatus, setApplicationStatus] = useState<number>();
  const [second, setSecond] = useState<number | null>(null);

  const checkTokenExpiracy = async () => {
    const response = await axios.get("/api/users/get-auth-status/");
    const { auth_status, auth_token } = response.data;
    const validToken = auth_token > Date.now() / 1000;
    if (validToken) {
      setSecond(auth_token - Date.now() / 1000);
    } else {
      await updateProfile({ auth_status: 3 });
    }
  };

  useEffect(() => {
    if (second && second > 0 && user?.auth_status == 5) {
      const timer = setTimeout(() => setSecond(second - 1), 1000);
    }
    if (second === 0) {
      (async () => {
        await updateProfile({ auth_status: 3 });
      })();
    }
  }, [second]);

  useEffect(() => {
    setApplicationStatus(user?.auth_status);

    let interval: any;
    const getAuthStatus = async () => {
      const response = await axios.get("/api/users/get-auth-status/");
      const { auth_status, auth_token } = response.data;
      console.log(auth_status, auth_token);
      if (auth_status === 5 && interval) {
        clearInterval(interval);
        setUser({ ...(user as User), auth_status: 5 });
      }
    };
    if (user?.auth_status === 4) {
      interval = setInterval(getAuthStatus, 2000);
    }
    if (user?.auth_status === 5) {
      checkTokenExpiracy();
    }
  }, [user]);

  return (
    <>
      {applicationStatus === 5 && (
        <ApplicationAccepted second={second as number} />
      )}
      <div className=" fixed bottom-0 p-12 border-t-1 z-10 border-black w-full bg-white">
        <div className="flex justify-center items-center gap-12">
          <StepBar
            step={(applicationStatus as number) - 3}
            stepBarItemList={stepBarItemList}
          >
            <hr className="w-[208px]" />
          </StepBar>
        </div>
      </div>
    </>
  );
};

export default ApplicationStatus;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LinearLoading from "@/components/loading/linear";
import useAuth from "@/hooks/useAuth";
import Activate from "@/components/auth/progress/activate";
import AddAvatar from "@/components/auth/progress/addAvatar";

import IdVerification from "@/components/auth/progress/id-verification";
import SubmitApplication from "@/components/auth/progress/submit-application";
import ApplicationStatus from "@/components/auth/progress/application-status";
import Subscription from "@/components/auth/progress/subscription";
import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
// ==============================|| AUTH GUARD ||============================== //

const AuthProgress = () => {
  const [page, setPage] = useState<React.ReactElement>(<LinearLoading />);
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if ((user?.auth_status as number) < 1) setPage(<Activate />);
    else if ((user?.auth_status as number) < 2) setPage(<AddAvatar />);
    else if ((user?.auth_status as number) < 3) setPage(<IdVerification />);
    else if ((user?.auth_status as number) < 4) setPage(<SubmitApplication />);
    else if ((user?.auth_status as number) < 6) setPage(<ApplicationStatus />);
    else if ((user?.auth_status as number) < 7) setPage(<Subscription />);

    // eslint-disable-next-line
  }, [user, isLoggedIn]);

  return <>{page}</>;
};
AuthProgress.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.authprogress}>{page}</Layout>;
};
export default AuthProgress;

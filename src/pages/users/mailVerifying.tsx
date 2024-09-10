import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import axios from "@/utils/axios";

import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const MailVerifying = () => {
  const [mailVerified, setMailVerified] = useState(false);
  const [mailAlreadyVerified, setMailAlreadyVerified] = useState(false);
  const [mailVerifyingFailed, setMailVerifyingFailed] = useState(false);
  const { user, setToken } = useAuth();
  const router = useRouter();
  const { uid, token } = router.query;
  const verifyEmail = async (uid: string, token: string) => {
    try {
      const response = await axios.get(
        `api/users/account/activate/${uid}/${token}/`
      );

      setMailVerified(true);
      const { user, tokenObj } = response.data;
      setToken(tokenObj, user);
      router.push("/users/mailVerified");
    } catch (err) {
      setMailVerifyingFailed(true);
    }
  };
  useEffect(() => {
    if (uid && token && mailAlreadyVerified === false) {
      verifyEmail(uid as string, token as string);
    }
    // eslint-disable-next-line
  }, [router, user]);

  if (mailVerifyingFailed === true) return <>Mail verifying failed...</>;
  if (mailAlreadyVerified) {
    return <>Mail already verified</>;
  } else {
    if (mailVerified === true && mailVerifyingFailed === false) {
      return <>Mail Successfully verified...</>;
    } else if (mailVerified === false && mailVerifyingFailed === false)
      return <>Mail verifying...</>;
    else return <></>;
  }
};

export default MailVerifying;

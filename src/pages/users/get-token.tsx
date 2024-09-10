import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import axios from "@/utils/axios";

import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const GetToken = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setToken } = useAuth();
  const getUserToken = async (uid: string, token: string) => {
    try {
      const response = await axios.get(
        "api/users/signin/magic/" + uid + "/" + token + "/"
      );
      const { tokenObj, user } = response.data;
      setToken(tokenObj, user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const uid = searchParams.get("uid");
    const token = searchParams.get("token");
    if (uid && token) {
      getUserToken(uid, token);
    }
    // eslint-disable-next-line
  }, [searchParams, user]);

  return <>Signin to LSS</>;
};
GetToken.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.noauth}>{page}</Layout>;
};

export default GetToken;

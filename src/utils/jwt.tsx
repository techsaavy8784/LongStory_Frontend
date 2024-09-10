import jwtDecode from "jwt-decode";
import { verify, sign } from "jsonwebtoken";
//
import axios from "./axios";

// ----------------------------------------------------------------------

const checkToken = (access: number) => {
  if (!access) {
    return false;
  }
  const currentTime = Date.now() / 1000;

  return access > currentTime;
};

const getSecond = (access: number) => {
  // const decoded = jwtDecode<{ exp: number }>(access);
  const currentTime = Date.now() / 1000;

  return access - currentTime;
};

const setSession = ({
  access,
  refresh,
}: {
  access: string | null;
  refresh: string | null;
}) => {
  if (access && refresh) {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    axios.defaults.headers.common.Authorization = `Bearer ${access}`;
  } else {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { checkToken, getSecond, setSession, verify, sign };

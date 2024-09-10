import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import LinearLoading from "../loading/linear";

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) router.push("/");

    // eslint-disable-next-line
  }, [isLoggedIn, user]);

  if (isLoggedIn) return <LinearLoading />;
  return <>{children}</>;
};

export default GuestGuard;

import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import LinearLoading from "../loading/linear";

// ==============================|| AUTH GUARD ||============================== //

const AuthGurad = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) router.push("/users/signin");
    if (user && (user?.auth_status as number) < 7) {
      router.push("/users/signup/progress");
    }
    // eslint-disable-next-line
  }, [isLoggedIn, user]);

  if (!user || !isLoggedIn || (user?.auth_status as number) < 7)
    return <LinearLoading />;
  return <>{children}</>;
};

export default AuthGurad;

import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import LinearLoading from "../loading/linear";

// ==============================|| AUTH GUARD ||============================== //

const MailGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) router.push("/users/signin");
    // eslint-disable-next-line
  }, [isLoggedIn]);

  if (!isLoggedIn) return <LinearLoading />;

  return <>{children}</>;
};

export default MailGuard;

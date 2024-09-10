import { ReactElement, ReactNode, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import axios from "@/utils/axios";
import { checkToken } from "@/utils/jwt";
import LinearLoading from "../../loading/linear";

const AuthTokenCheckLayout = ({ children }: { children: ReactNode }) => {
  const { user, updateProfile } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const getAuthStatus = async () => {
      const response = await axios.get("/api/users/get-auth-status/");
      const { auth_status, auth_token } = response.data;
      console.log(auth_token);
      const validToken = checkToken(auth_token);
      setChecked(validToken);
      if (!validToken) {
        // await updateProfile({ auth_status: 3 });
      }
    };
    if (user?.auth_status === 5) {
      getAuthStatus();
    } else if (user?.auth_status === 4) {
      setChecked(true);
    }
  }, [user]);

  if (checked) {
    return <>{children}</>;
  } else {
    return <LinearLoading />;
  }
};

export default AuthTokenCheckLayout;

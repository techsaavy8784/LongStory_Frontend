import axios from "axios";

const baseURL: string =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
    ? "http://localhost:8000"
    : process.env.NEXT_PUBLIC_ENVIRONMENT === "test"
    ? "https://spendersanonymous.org"
    : "https://longstory.sh";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);
// export const axiosInstance;
export default axiosInstance;

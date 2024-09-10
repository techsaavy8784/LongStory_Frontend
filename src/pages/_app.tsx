import "@fontsource/plus-jakarta-sans"; // Defaults to weight 400
import "@fontsource/plus-jakarta-sans/400.css"; // Specify weight
import "@fontsource/plus-jakarta-sans/400-italic.css"; // Specify weight and style

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { JWTProvider as AuthProvider } from "@/contexts/JWTContext";
import { NextPage } from "next";

type LayoutProps = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface Props {
  Component: LayoutProps;
}

export default function App({ Component, pageProps }: AppProps & Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <Provider store={store}>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </Provider>
  );
}

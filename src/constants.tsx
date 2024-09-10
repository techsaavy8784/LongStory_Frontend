export const LAYOUT: any = {
  main: "main",
  noauth: "noauth",
  minimal: "minimal",
  authprogress: "authprogress",
  mail: "mail",
};

export interface Props {
  children: React.ReactElement;
  variant?: "main" | "minimal" | "noauth" | "authprogress" | "mail";
}

export const PAGE_SIZE: any = {
  follow: 1,
};

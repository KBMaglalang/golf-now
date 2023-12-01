export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/user",
    "/user/profile",
    "/user/settings",
    "/user/orders",
    "/api/user/profile",
    "/api/user/settings",
  ],
};

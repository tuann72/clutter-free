'use client';

import { UserContext } from "@/context/UserContext";

// create a typing for user info (used by clerk)
type UserInfo = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
} | null;

export default function UserProvider({
  userInfo,
  children,
}: {
  userInfo: UserInfo;
  children: React.ReactNode;
}) {
  return (
    // pass user context (user data) to the variables
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
}

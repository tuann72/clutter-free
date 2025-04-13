'use client';

import { UserContext } from "@/context/UserContext";

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
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
}

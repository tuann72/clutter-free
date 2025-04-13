'use client';

import { createContext, useContext } from 'react';

type UserInfo = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
} | null;

export const UserContext = createContext<UserInfo>(null);
export const useUserInfo = () => useContext(UserContext);

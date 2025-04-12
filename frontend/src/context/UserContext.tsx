'use client';

import { createContext, useContext } from 'react';

type SafeUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
} | null;

export const UserContext = createContext<SafeUser>(null);
export const useUser = () => useContext(UserContext);

"use client";
import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const WebSocketContext = createContext<idata | null>(null);
export const ApiEnd = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
});
interface iuserWithoutPassword {
  id: string;
  email: string;
  name: string;
  role: "admin" | "nornal";
}
interface idata {
  user: iuserWithoutPassword | null;
  setUser: React.Dispatch<React.SetStateAction<iuserWithoutPassword | null>>;
}

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<iuserWithoutPassword | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

  const checkLoginState = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await axios.get(`${apiUrl}/loginCheckRoute`, {
        withCredentials: true,
      });

      if (user) setUser(user);
    } catch (err) {
      console.log(err);
    }
  }, [apiUrl]);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  return (
    <WebSocketContext.Provider value={{ user, setUser }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useContextHook = () => useContext(WebSocketContext);

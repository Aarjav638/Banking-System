import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";

interface AxiosContextProps {
  axiosInstance: AxiosInstance;
  token: string | null;
  setToken: (token: string) => void;
  isTokenReady: boolean;
}

const AxiosContext = createContext<AxiosContextProps | undefined>(undefined);

export const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>("");
  const [isTokenReady, setIsTokenReady] = useState<boolean>(false);
  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    setIsTokenReady(true);
  }, [axiosInstance]);

  return (
    <AxiosContext.Provider
      value={{ axiosInstance, token, setToken, isTokenReady }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (context === undefined) {
    throw new Error("useAxios must be used within a AxiosProvider");
  }
  return context;
};

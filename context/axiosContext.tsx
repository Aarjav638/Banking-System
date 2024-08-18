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
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsTokenReady(true);
  }, []);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          alert("Session has expired. Please log in again.");
          localStorage.removeItem("token");
          setToken(null);
          router.push("/");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [token, router]);

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

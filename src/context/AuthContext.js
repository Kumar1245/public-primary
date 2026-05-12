import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  LOGIN_USER,
  SIGNUPUSER,
  SOCIAL_LOGIN_USER,
  GETPROFILE,
  USERLOGOUT,
} from "../services/ApiCalls";
import { errorToast, successToast } from "../Utilities/toastsMessages";
import pageRoutes from "../services/routes";
import { useFirebase } from "../firebase/firebase";

const AuthContext = createContext(null);

const clearAuthStorage = () => {
  if (typeof window === "undefined") return;

  [
    "authToken",
    "authUser",
    "authUser?._id",
    "auth",
    "userId",
  ].forEach((key) => localStorage.removeItem(key));
};

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));

    setHydrated(true);
    setAuthReady(true);
  }, []);

  const {
    data: profile,
    isLoading: userLoading,
    isError: userError,
    error: userErrorObj,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await GETPROFILE();
      return res.data.data;
    },
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (profile) {
      setUser(profile);
      localStorage.setItem("authUser", JSON.stringify(profile));
      if (profile?._id) {
        localStorage.setItem("userId", profile._id);
      }
    }
  }, [profile]);

  const loginMutation = useMutation({
    mutationFn: LOGIN_USER,
    onSuccess: (res) => {
      const token = res.data?.data?.token;
      const userData = res.data?.data;
      if (!token) {
        errorToast("Login failed");
        return;
      }
      localStorage.setItem("authToken", token);
      setToken(token);
      if (userData) {
        localStorage.setItem("authUser", JSON.stringify(userData));
        if (userData?._id) {
          localStorage.setItem("userId", userData._id);
        }
        setUser(userData);
      }
      successToast("Login successful!");
      router.push("/dashboard");
    },
    onError: (err) => {
      errorToast(err?.response?.data?.message || "Login failed");
    },
  });

  const logout = async () => {
    try {
      const res = await USERLOGOUT();
      if (res?.data?.status === "success") {
        successToast(res?.data?.message);
      } else {
        errorToast(res?.data?.message || "Logout failed");
      }
    } catch (error) {
      errorToast("Session expired. Logging out...");
    } finally {
      setToken(null);
      setUser(null);
      clearAuthStorage();
      router.replace(pageRoutes.HOME);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        hydrated,
        isAuthenticated: !!token && !!user,
        login: (data) => loginMutation.mutate(data),
        logout,
        authReady,
        loginLoading: loginMutation.isPending,
        userLoading,
        userError,
        userErrorObj,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};

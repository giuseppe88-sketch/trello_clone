import React, { createContext, useState } from "react";
import { login } from "../services/api";

interface AuthState {
  isAuthenticated: boolean;
  loginRequest: (username: string, password: string) => Promise<void>;
  logout: () => void;
  userToken: string;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  loginRequest: async () => {},
  logout: () => {},
  userToken: "",
};

export const AuthContext = createContext(initialAuthState);

export interface loginProps {
  username: string;
  password: string;
}
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");

  const loginRequest = async (username: string, password: string) => {
    return login(username, password)
      .then((response) => {
        if (!response.user) {
          console.error(response.message);
          return response
        } else {
          console.log("response token: " + response.token, response);
          localStorage.setItem("token", response.token);
          setUserToken(response.token);
          setIsAuthenticated(true);
          return response
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginRequest, logout, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

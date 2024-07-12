import React, { createContext, useEffect, useState } from "react";
import {
  getCardsRequest,
  getListRequest,
  login,
  register,
  postCardRequest,
} from "../services/api";

interface AuthState {
  isAuthenticated: boolean;
  loginRequest: (username: string, password: string) => Promise<void>;
  postCardRequest: (
    title: string,
    description: string,
    listId: string,
    YOUR_ACCESS_TOKEN: string,
    position: number
  ) => Promise<void>;
  registerRequest: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  logout: () => void;
  userToken: string;
  dataCards: [];
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  loginRequest: async () => {},
  registerRequest: async () => {},
  postCardRequest: async () => {},
  logout: () => {},
  userToken: "",
  dataCards: [],
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
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [data, setData] = useState<[]>([]);
  const [dataCards, setDataCards] = useState<[]>([]);

  const loginRequest = async (username: string, password: string) => {
    return login(username, password)
      .then((response) => {
        if (!response.user) {
          console.error(response.message);
          return response;
        } else {
          console.log("response token: " + response.token, response);
          localStorage.setItem("token", response.token);
          setUserToken(response.token);
          setIsAuthenticated(true);
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registerRequest = async (
    username: string,
    password: string,
    email: string
  ) => {
    return register(username, password, email)
      .then((response) => {
        if (!response.user) {
          return response;
        } else {
          console.log("response token: " + response.token, response);
          localStorage.setItem("token", response.token);
          setUserToken(response.token);
          setIsAuthenticated(true);
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getList = async (userToken: string | null) => {
    return getListRequest(userToken as string)
      .then((response) => {
        if (!response) {
          console.error(response);
          return response;
        } else {
          console.log("Fetch List from User", response);
          setData(response);
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

  const getCards = async (userToken: string | null) => {
    return getCardsRequest(userToken as string)
      .then((response) => {
        if (!response) {
          console.error(response);
          return response;
        } else {
          console.log("Fetch Cards from User", response);
          setDataCards(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const postCard = async (
    title: string,
    description: string,
    userToken: string | null,
    listId: string,
    position: number
  ) => {
    return postCardRequest(
      userToken as string,
      title,
      description,
      listId,
      position
    )
      .then((response) => {
        if (!response) {
          console.error(response);
          return response;
        } else {
          console.log("Fetch Cards from User", response);
          setDataCards(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (userToken) {
      getList(userToken);
      getCards(userToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginRequest,
        logout,
        userToken,
        registerRequest,
        getList,
        data,
        setData, // for dashboard page to fetch data and update it.
        dataCards,
        postCard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useEffect, useState } from "react";
import {
  getCardsRequest,
  getListRequest,
  login,
  register,
  postCardRequest,
  deleteCardRequest,
  putCardRequest,
} from "../services/api";

interface AuthState {
  isAuthenticated: boolean;
  loginRequest: (username: string, password: string) => Promise<void>;

  registerRequest: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  logout: () => void;
  userToken: string | null;
  dataCards: [];
  getList: (userToken: string | null) => Promise<void>;
  getCards: (userToken: string | null) => Promise<void>;
  setListId:  React.Dispatch<React.SetStateAction<string | null>>;
  setCardId: React.Dispatch<React.SetStateAction<string | null>>;
  postCard: (
    title: string | null,
    description: string | null,
    listId: string | null,
    userToken: string | null,
    position: number | null
  ) => Promise<void>;
  data: [];
  setData: (data: []) => void;
  listId: string | null;
  cardId: string | null;
  deleteCard: (
    cardId: string | null,
    listId: string | null,
    userToken: string | null
  ) => Promise<void>;
  putCard: (
    cardId: string | null,
    userToken: string | null,
    title: string | null,
    description: string | null,
    position: number | null
  ) => Promise<void>;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  loginRequest: async () => {},
  registerRequest: async () => {},
  deleteCard: async () => {},
  getList: async () => {},
  getCards: async () => {},
  logout: () => {},
  userToken: null,
  dataCards: [],
  setListId: async () => {},
  setCardId: async () => {},
  postCard: async () => {},
  putCard: async () => {},
  data: [],
  setData: async () => {},
  listId: null,
  cardId: null,
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
  const [listId, setListId] = useState<string | null>(null); // New state for listId
  const [cardId, setCardId] = useState<string>(""); // New state for listId

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getList = async (userToken: string | null) => {
    return getListRequest(userToken)
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCards = async (userToken: string | null) => {
    return getCardsRequest(userToken)
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
    listId: string,
    userToken: string | null,
    position: number | null
  ) => {
    return postCardRequest(title, description, listId, userToken, position)
      .then((response) => {
        if (!response) {
          console.error(response);
          return response;
        } else {
          console.log("post Cards from User", response);
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const putCard = async (
    cardId: string | null,
    userToken: string | null,
    title: string | null,
    description: string | null,
    position: number | null
  ) => {
    return putCardRequest(cardId, userToken, title, description, position)
      .then((response) => {
        if (!response) {
          console.error(response);
          return response;
        } else {
          console.log("put Cards from User", response);
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteCard = async (
    cardId: string | null,
    listId: string | null,
    userToken: string | null
  ) => {
    return deleteCardRequest(cardId, listId, userToken)
      .then((response) => {
        if (!response) {
          console.error(response);
          return response;
        } else {
          console.log("Card Delete from user", response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (userToken) {
      getCards(userToken);
      getList(userToken);
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginRequest,
        logout,
        userToken,
        registerRequest,
        getCards,
        getList,
        data,
        setData, // for dashboard page to fetch data and update it.
        dataCards,
        postCard,
        setListId, // for dashboard page to set listId.
        listId,
        cardId,
        setCardId,
        deleteCard,
        putCard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

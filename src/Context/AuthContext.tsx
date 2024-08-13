import React, { createContext, useEffect, useState } from "react";
import {
  getCardsRequest,
  getListRequest,
  login,
  register,
  postCardRequest,
  moveCardRequest,
  deleteCardRequest,
  putCardRequest,
  postListRequest,
  deleteListRequest,
} from "../services/api";

export interface Card {
  _id: string;
  title: string;
  description: string;
  position: number;
  listId: string;
}

export interface List {
  _id: string;
  title: string;
  cards: Card[];
}

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;

  loginRequest: (username: string, password: string) => Promise<void>;

  registerRequest: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  logout: () => void;
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  dataCards: {
    _id: string;
    title: string;
    description: string;
    position: number;
    listId: string;
  }[];
  getList: (userToken: string | null) => Promise<void>;
  getCards: (userToken: string | null) => Promise<void>;
  setListId: React.Dispatch<React.SetStateAction<string | null>>;
  setCardId: React.Dispatch<React.SetStateAction<string | null>>;
  postCard: (
    title: string | null,
    description: string | null,
    listId: string | null,
    userToken: string | null,
    position: number | null
  ) => Promise<void>;
  dataList: List[];
  setDataList: React.Dispatch<React.SetStateAction<List[]>>;
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
  moveCard: (
    cardId: string | null,
    userToken: string | null,
    listId: string | null
  ) => Promise<void>;
  postList: (title: string | null, userToken: string | null) => Promise<void>;
  deleteList: (title: string | null, userToken: string | null) => Promise<void>;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  setIsAuthenticated: async () => {},
  loginRequest: async () => {},
  registerRequest: async () => {},
  deleteCard: async () => {},
  getList: async () => {},
  getCards: async () => {},
  logout: () => {},
  userToken: null,
  setUserToken: async () => {},
  dataCards: [],
  setListId: async () => {},
  setCardId: async () => {},
  postCard: async () => {},
  postList: async () => {},
  deleteList: async () => {},
  putCard: async () => {},
  moveCard: async () => {},
  dataList: [
    {
      _id: "",
      title: "",
      cards: [],
    },
  ],
  setDataList: async () => {},
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
  const [dataList, setDataList] = useState<AuthState["dataList"]>([]);
  const [dataCards, setDataCards] = useState<[]>([]);
  const [listId, setListId] = useState<string | null>(null); // New state for listId
  const [cardId, setCardId] = useState<string | null>(""); // New state for listId

  useEffect(() => {
    // Update userToken if it changes in localStorage
    const token = localStorage.getItem("token");
    setUserToken(token);
  }, []);

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
    return getListRequest(userToken)
      .then((response) => {
        if (!response) {
          console.error(response);
          return response;
        } else {
          console.log("Fetch List from User", response);
          setDataList(response);
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
    title: string | null,
    description: string | null,
    listId: string | null,
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
  const moveCard = async (
    cardId: string | null,
    userToken: string | null,
    listId: string | null
  ) => {
    return moveCardRequest(cardId, userToken, listId)
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

  const postList = async (userToken: string | null, title: string | null) => {
    return postListRequest(userToken, title)
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

  const deleteList = async (
    userToken: string | null,
    listId: string | null
  ) => {
    return deleteListRequest(listId, userToken)
      .then((response) => {
        if (!response) {
          console.error(response);
          return response;
        } else {
          console.log("List Deleted from user", response);
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
        setIsAuthenticated,
        loginRequest,
        logout,
        userToken,
        registerRequest,
        getCards,
        getList,
        dataList,
        setDataList, // for dashboard page to fetch data and update it.
        dataCards,
        postCard,
        setListId, // for dashboard page to set listId.
        listId,
        cardId,
        setCardId,
        deleteCard,
        putCard,
        moveCard,
        postList,
        deleteList,
        setUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

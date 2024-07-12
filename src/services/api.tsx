// src/services/api.js
const BASE_URL = "https://trello-clone-backend-liard.vercel.app/login";
const BASE_API_USER = "https://trello-clone-backend-liard.vercel.app/api/users";
const BASE_API_GET_LIST =
  "https://trello-clone-backend-liard.vercel.app/api/cards";
const BASE_API_GET_USER =
  "https://trello-clone-backend-liard.vercel.app/api/lists";

export const login = async (username: string, password: string) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    // credentials: "include" , // Include credentials (cookies, etc.)
  };
  const request = new Request(BASE_URL, requestOptions);

  return fetch(request)
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        return error;
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const register = async (
  username: string,
  password: string,
  email: string
) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
    // credentials: "include" , // Include credentials (cookies, etc.)
  };
  const request = new Request(BASE_API_USER, requestOptions);

  return fetch(request)
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        return error;
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error("Error from api:", error);
      throw error;
    });
};
export const getListRequest = async (YOUR_ACCESS_TOKEN: string) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
    },
    // redirect: "follow",

    // credentials: "include" , // Include credentials (cookies, etc.)
  };
  const request = new Request(BASE_API_GET_USER, requestOptions);

  return fetch(request)
    .then(async (response) => {
      if (!response) {
        console.log("error", response);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error from api:", error);
      throw error;
    });
};
export const getCardsRequest = async (YOUR_ACCESS_TOKEN: string) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
    },
    // redirect: "follow",

    // credentials: "include" , // Include credentials (cookies, etc.)
  };
  const request = new Request(BASE_API_GET_LIST, requestOptions);

  return fetch(request)
    .then(async (response) => {
      if (!response) {
        console.log("error", response);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error from api:", error);
      throw error;
    });
};

export const postCardRequest = async (
  title: string,
  description: string,
  listId: string,
  YOUR_ACCESS_TOKEN: string,
  position: number
) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      listId,
      YOUR_ACCESS_TOKEN,
      position,
    }),
    // credentials: "include" , // Include credentials (cookies, etc.)
  };
  const url = `https://trello-clone-backend-liard.vercel.app/api/listsCards/${listId}/card/`;

  const request = new Request(url, requestOptions);

  return fetch(request)
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        return error;
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default {
  login,
  register,
};

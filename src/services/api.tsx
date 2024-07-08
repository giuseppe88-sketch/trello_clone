// src/services/api.js
const BASE_URL = "https://trello-clone-backend-liard.vercel.app/login";
const BASE_API_USER = "https://trello-clone-backend-liard.vercel.app/api/users";

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

export default {
  login,
  register,
};

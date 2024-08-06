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
export const getListRequest = async (YOUR_ACCESS_TOKEN: string | null) => {
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
export const getCardsRequest = async (YOUR_ACCESS_TOKEN: string | null) => {
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
  title: string | null,
  description: string | null,
  listId: string | null,
  YOUR_ACCESS_TOKEN: string | null,
  position: number | null
) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
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
export const putCardRequest = async (
  cardId: string | null,
  YOUR_ACCESS_TOKEN: string | null,
  title: string | null,
  description: string | null,
  position: number | null,
  listId?: string | null
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      YOUR_ACCESS_TOKEN,
      title,
      description,
      position,
      listId,
    }),
    // credentials: "include" , // Include credentials (cookies, etc.)
  };
  const url = `https://trello-clone-backend-liard.vercel.app/api/cards/${cardId}`;

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
export const moveCardRequest = async (
  cardId: string | null,
  YOUR_ACCESS_TOKEN: string | null,
  listId?: string | null
) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      YOUR_ACCESS_TOKEN,
      listId,
    }),
    // credentials: "include" , // Include credentials (cookies, etc.)
  };
  const url = `https://trello-clone-backend-liard.vercel.app/api/cards/${cardId}/list`;

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

export const deleteCardRequest = async (
  cardId: string | null,
  listId: string | null,
  YOUR_ACCESS_TOKEN: string | null
) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      cardId,
      listId,
      YOUR_ACCESS_TOKEN,
    }),
    // credentials: "include" , // Include credentials (cookies, etc.)
  };
  const url = `https://trello-clone-backend-liard.vercel.app/api/listsCards/${listId}/card/${cardId}`;

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

export const postListRequest = async (
  YOUR_ACCESS_TOKEN: string | null,
  title: string | null
) => {
  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      YOUR_ACCESS_TOKEN,
      title,
    }),
    // credentials: "include" , // Include credentials (cookies, etc.)
  };
  const url = `https://trello-clone-backend-liard.vercel.app/api/lists/`;

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

export const deleteListRequest = async (
  YOUR_ACCESS_TOKEN: string | null,
  listId: string | null
) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      YOUR_ACCESS_TOKEN,
      listId,
    }),
    // credentials: "include" , // Include credentials (cookies, etc.)
  };
  const url = `https://trello-clone-backend-liard.vercel.app/api/lists/${listId}/`;

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

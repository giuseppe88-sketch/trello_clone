const initialData = {
    lists: {
      "list-1": { id: "list-1", title: "To Do", cardIds: ["card-1", "card-2"] },
      "list-2": { id: "list-2", title: "In Progress", cardIds: ["card-3"] },
      "list-3": {
        id: "list-3",
        title: "Done",
        cardIds: ["card-4", "card-5", "card-6"],
        position: 4,
      },
      "list-4": {
        id: "list-4",
        title: "In Testing",
        cardIds: ["card-4", "card-5", "card-6"],
        position: 4,
      },
      "list-5": {
        id: "list-5",
        title: "Closed",
        cardIds: ["card-4", "card-5", "card-6"],
        position: 4,
      },
    },
    cards: {
      "card-1": {
        id: "card-1",
        title: "debug BE",
        description:
          "Error on users endpoint when trying to connect to the server",
        position: 4,
      },
      "card-2": {
        id: "card-2",
        title: "fix bug on front-end",
        description:
          "Error while lunching the app after restart from the front-end",
        position: 4,
      },
      "card-3": {
        id: "card-3",
        title: "Dashboard page implementation",
        description:
          "implement table on Dashboard page with custom header and footer",
        position: 4,
      },
      "card-4": {
        id: "card-4",
        title: "debug BE",
        description:
          "Error on users endpoint when card is not found in the database",
        position: 4,
      },
      "card-5": {
        id: "card-5",
        title: "fix bug on front-end",
        description:
          "Error while lunching the app after initialization and loading  the database",
        position: 4,
      },
      "card-6": {
        id: "card-6",
        title: "Dashboard page implementation",
        description: "implement table on Dashboard page",
        position: 4,
      },
      "card-7": {
        id: "card-7",
        title: "test api",
        description: "Test backend endpoints",
        position: 4,
      },
      "card-8": {
        id: "card-8",
        title: "Login implementation ",
        description: "implement login page",
        position: 4,
      },
      "card-9": {
        id: "card-9",
        title: "Back end test",
        description: "test backend",
        position: 4,
      },
    },
  };
  const listOrder = ["To Do", "In Progress", "", "list-4", "list-5"];
  const cards = [
    {
      id: "card-1",
      title: "debug BE",
      description: "Error on users endpoint when trying to connect to the server",
      position: 4,
    },
    {
      id: "card-2",
      title: "fix bug on front-end",
      description:
        "Error while lunching the app after restart from the front-end",
      position: 4,
    },
    {
      id: "card-3",
      title: "Dashboard page implementation",
      description:
        "implement table on Dashboard page with custom header and footer",
      position: 4,
    },
    {
      id: "card-4",
      title: "debug BE",
      description:
        "Error on users endpoint when card is not found in the database",
      position: 4,
    },
    {
      id: "card-5",
      title: "fix bug on front-end",
      description:
        "Error while lunching the app after initialization and loading  the database",
      position: 4,
    },
    {
      id: "card-6",
      title: "Dashboard page implementation",
      description: "implement table on Dashboard page",
      position: 4,
    },
    {
      id: "card-7",
      title: "test api",
      description: "Test backend endpoints",
      position: 4,
    },
    {
      id: "card-8",
      title: "Login implementation ",
      description: "implement login page",
      position: 4,
    },
    {
      id: "card-9",
      title: "Back end test",
      description: "test backend",
      position: 4,
    },
  ];
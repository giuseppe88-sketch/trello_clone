/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  AppBar,
  Toolbar,
} from "@mui/material";
import "./DashboardPage.scss";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import backgroundImage from "../assets/backgroundImage.jpg";

const initialData = {
  lists: {
    "list-1": { id: "list-1", title: "To Do", cardIds: ["card-1", "card-2"] },
    "list-2": { id: "list-2", title: "In Progress", cardIds: ["card-3"] },
    "list-3": {
      id: "list-3",
      title: "Done",
      cardIds: ["card-4", "card-5", "card-6"],
    },
    "list-4": {
      id: "list-4",
      title: "In Testing",
      cardIds: ["card-4", "card-5", "card-6"],
    },
    "list-5": {
      id: "list-5",
      title: "Closed",
      cardIds: ["card-4", "card-5", "card-6"],
    },
  },
  cards: {
    "card-1": {
      id: "card-1",
      title: "debug BE",
      description: "Error on users endpoint",
    },
    "card-2": {
      id: "card-2",
      title: "fix bug on front-end",
      description: "Error while lunching the app",
    },
    "card-3": {
      id: "card-3",
      title: "Dashboard page implementation",
      description: "implement table on Dashboard page",
    },
    "card-4": {
      id: "card-4",
      title: "debug BE",
      description: "Error on users endpoint",
    },
    "card-5": {
      id: "card-5",
      title: "fix bug on front-end",
      description: "Error while lunching the app",
    },
    "card-6": {
      id: "card-6",
      title: "Dashboard page implementation",
      description: "implement table on Dashboard page",
    },
    "card-7": {
      id: "card-7",
      title: "test api",
      description: "Test backend endpoints",
    },
    "card-8": {
      id: "card-8",
      title: "Login implementation ",
      description: "implement login page",
    },
    "card-9": {
      id: "card-9",
      title: "Back end test",
      description: "test backend",
    },
  },
  listOrder: ["list-1", "list-2", "list-3", "list-4", "list-5"],
};
export default function DashboardPage() {
  const { userToken, isAuthenticated } = useContext(AuthContext);

  const [data, setData] = useState(initialData);
  const [newCardContent, setNewCardContent] = useState("");

  return (
    <>
      {userToken ? (
        <div
          className="dashboard-container"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "10px",
            boxShadow: "inset 10px 10px 30px rgba(0, 0, 0, 1.5)",
          }}
        >
          <AppBar
            position="static"
            style={{
              padding: "5px",
              margin: "0 auto",
              width: "100%",
              backgroundColor: "#23282e",
              borderBottom: "0.1px solid hsla(211,18%,68%,0.16)",
            }}
          >
            <Toolbar
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                <Typography>DashboardPage</Typography>
                <Typography>DashboardPage</Typography>
                <Typography>DashboardPage</Typography>
                <Typography>DashboardPage</Typography>
                <Typography>DashboardPage</Typography>
              </div>
              <div></div>
              <div style={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
                <TextField
                  variant="outlined"
                  label="New Card"
                  fullWidth
                  value={newCardContent}
                  onChange={(e) => setNewCardContent(e.target.value)}
                  style={{ marginTop: 16 }}
                />
                  <CircleNotificationsIcon
                    color={"info"}
                  />{" "}
              </div>
            </Toolbar>
          </AppBar>
          <AppBar
            position="static"
            style={{
              width: "99%",
              padding: "40px",
              margin: "0 auto",
              backgroundColor: "rgba(35, 40, 46, 0.7)", // Blue color with 40% opacity
            }}
          >
            <Toolbar>
              <Typography>Devs_Project</Typography>
              <Typography>Header</Typography>
              <Typography>Header</Typography>
            </Toolbar>
          </AppBar>
          <Box
            display="flex"
            flexDirection="row"
            p={1}
            // m={1}
            justifyContent="center"
          >
            {data.listOrder.map((listId) => {
              const list = data.lists[listId];
              const cards = list.cardIds.map((cardId) => data.cards[cardId]);

              return (
                <Box key={list.id} flex={1} p={1}>
                  <Paper elevation={3} style={{ padding: 16 }}>
                    <Typography variant="h6" component="h2">
                      {list.title}
                    </Typography>
                    <div>
                      {cards.map((card: any) => (
                        <>
                          <Paper
                            key={card.id}
                            elevation={1}
                            style={{
                              padding: 8,
                              margin: "8px 0",
                              height: "170px",
                            }}
                          >
                            <Box>
                              <div>
                                <Typography>{card.title}</Typography>
                              </div>
                              <div>
                                <Typography>{card.description}</Typography>
                              </div>
                            </Box>
                          </Paper>
                        </>
                      ))}
                    </div>
                    <TextField
                      variant="outlined"
                      label="New Card"
                      fullWidth
                      value={newCardContent}
                      onChange={(e) => setNewCardContent(e.target.value)}
                      style={{ marginTop: 16 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ marginTop: 8 }}
                      onClick={() => handleAddCard(list.id)}
                    >
                      Add Card
                    </Button>
                  </Paper>
                </Box>
              );
            })}
          </Box>{" "}
        </div>
      ) : (
        "USER NOT AUTHENTICATED"
      )}
    </>
  );
}

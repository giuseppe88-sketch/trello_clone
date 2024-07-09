/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Box, Paper, Typography, Button } from "@mui/material";
import "./DashboardPage.scss";

import backgroundImage from "../../assets/backgroundImage.jpg";

import MainAppbar from "./components/MainAppbar";
import AddIcon from "@mui/icons-material/Add";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Navbar from "./components/Navbar";
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
  // const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState(initialData);
  const [newCardContent, setNewCardContent] = useState("");


  // useEffect(() => {
  //   const scrollContainer = scrollContainerRef.current;

  //   if (!scrollContainer) return; // Check if scrollContainer is null

  //   const handleScroll = (event) => {
  //     const delta = event.deltaY;
  //     const scrollSpeed = 2; // Adjust this value to change scroll speed (higher means faster)
  //     scrollContainer.scrollTop += delta * scrollSpeed;
  //     event.preventDefault(); // Prevent the default scroll behavior
  //   };

  //   scrollContainer.addEventListener('wheel', handleScroll);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     scrollContainer.removeEventListener('wheel', handleScroll);
  //   };

  // }, []);
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
          <MainAppbar
            newCardContent={""}
            onSearchChange={function (
              e: React.ChangeEvent<HTMLInputElement>
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Navbar />
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
                  <Paper
                    elevation={3}
                    style={{
                      padding: 10,
                      backgroundColor: "#101204",
                      color: "#B6C2CF",
                      borderRadius: "18px",
                      maxHeight: "100%",
                    }}
                  >
                    <Typography variant="h6" component="h2">
                      {list.title}
                    </Typography>
                    <div
                      style={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        scrollBehavior: "smooth",
                        paddingRight: "8px", // Optional: Add padding to avoid scrollbar overlay
                      }}
                      className="custom-scrollbar"
                      // ref={scrollContainerRef}
                    >
                      {cards.map((card: any) => (
                        <>
                          <Paper
                            key={card.id}
                            elevation={1}
                            style={{
                              padding: 8,
                              margin: "8px 12px 4px",
                              color: "#B6C2CF",
                              backgroundColor: "#22272bf5",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "18px",
                              }}
                            >
                              <div>
                                <Typography fontSize="18px">
                                  {card.title}
                                </Typography>
                              </div>
                              <div>
                                <Typography>{card.description}</Typography>
                              </div>
                            </Box>
                          </Paper>
                        </>
                      ))}
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 3,
                          textTransform: "capitalize",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          textAlign: "start",
                          "&:hover": {
                            backgroundColor: "grey", // Change color on hover
                          },
                        }}

                        // onClick={() => handleAddCard(list.id)}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "7px",
                          }}
                        >
                          <AddIcon />
                          <Typography>Add Card</Typography>
                        </Box>
                        <Box></Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <EditCalendarIcon sx={{ fontSize: "1.0rem" }} />
                        </Box>
                      </Button>
                    </div>
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

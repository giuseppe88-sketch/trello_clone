/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Box } from "@mui/material";
import "./DashboardPage.scss";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../../assets/backgroundImage.jpg";

import MainAppbar from "./components/MainAppbar";

import Navbar from "./components/Navbar";

import DataTable from "./components/DataTable";

const listOrder = ["To Do", "In Progress", "In Testing", "Closed"];

export default function DashboardPage() {
  const {
    userToken,
    isAuthenticated,
    getList,
    data,
    setData,
    dataCards,
    postCard,
  } = useContext(AuthContext);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [position, setPosition] = useState<number>(null);
  const [open, setOpen] = React.useState(false);

  // const scrollContainerRef = useRef<HTMLDivElement>(null);

  // const handleSubmit = (event: Event) => {
  //   event.preventDefault();
  //   console.log(title, description, position);
  //   postCard(title, description, userToken, listId, position);
  //   setDescription("");
  //   setTitle("");
  //   setPosition(null);
  //   setOpen(false);
  // };

  const handleSubmit = (titleList: string) => (event: React.FormEvent) => {
    event.preventDefault();
    console.log(title, description, position, titleList);

    // Assuming you have a way to determine currentListId dynamically
    // const currentListId = titleList; // Use titleList as listId

    // postCard(title, description, userToken, currentListId, position)
    //   .then((result) => {
    //     console.log("Card added successfully:", result);
    //     setDescription("");
    //     setTitle("");
    //     setPosition(null);
    //     setOpen(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error adding card:", error);
    //     // Handle error appropriately
    //   });
  };
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
            justifyContent="flex-start"
            gap={"10px"}
            ml={"10px"}
          >
            {data
              ?.sort(
                (a: any, b: any) =>
                  listOrder.indexOf(a.title) - listOrder.indexOf(b.title)
              )
              .map((list: any) => {
                const cards = dataCards.filter(
                  (card: any) => card.listId === list._id
                );

                return (
                  <>
                    <DataTable
                      titleList={list.title}
                      cards={cards}
                      listId={list.id}
                      handleSubmit={handleSubmit(list.id)}
                      setNewCardTitle={setTitle}
                      setNewCardDescription={setDescription}
                      position={position}
                      setPosition={setPosition}
                      open={open}
                      setOpen={setOpen}
                    />
                  </>
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Box } from "@mui/material";
import "./DashboardPage.scss";

import backgroundImage from "../../assets/backgroundImage.jpg";

import MainAppbar from "./components/MainAppbar";

import Navbar from "./components/Navbar";

import DataTable from "./components/DataTable";

const listOrder = ["To Do", "In Progress", "In Testing", "Closed"];

export default function DashboardPage() {
  const {
    userToken,

    getCards,
    data,
    dataCards,
    postCard,
    setListId,
    listId,
    setCardId,
    cardId,
    deleteCard,
    putCard,
  } = useContext(AuthContext);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [position, setPosition] = useState<number | null>(null);

  const [open, setOpen] = React.useState<boolean>(false);
  const [openModify, setOpenModify] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false); // State to control Snackbar
  const [alert, setAlert] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);

  // const scrollContainerRef = useRef<HTMLDivElement>(null);
  const handleSubmit =
    (listId: string | null) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(title, description, position, listId);

      postCard(title, description, listId, userToken, position)
        .then((result: any) => {
          console.log("result", result);
          if (!result || result === undefined) {
            setOpen(false);
            setAlert("error occurred while submitting");
            setIsError(true);
            setOpenAlert(true);
            return;
          }
          console.log("Card added successfully:", result);
          setDescription("");
          setTitle("");
          setListId(null);
          setIsError(false);
          setAlert("Card added successfully");
          setOpenAlert(true);
        })
        .then(() => {
          getCards(userToken).then(() => {
            console.log("Cards refreshed successfully");
          });
          setOpen(false);
        })

        .catch((error): any => {
          console.error("Error adding card:", error);
          // Handle error appropriately
        });
    };
  const handleSubmitModify =
    (cardId: string | null) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(title, description, position, listId);

      putCard(cardId, userToken, title, description, position)
        .then((result: any) => {
          console.log("result", result);
          if (!result || result === undefined) {
            setOpenModify(false);
            setAlert("error occurred while submitting");
            setIsError(true);
            setOpenAlert(true);
            return;
          }
          console.log("Card modified successfully:", result);
          // setDescription("");
          // setTitle("");
          setCardId(null);
          // setIsError(false);
          // setAlert("Card modified successfully");
          // setOpenAlert(true);
        })
        .then(() => {
          getCards(userToken).then(() => {
            console.log("Cards refreshed successfully");
          });
          setOpenModify(false);
        })

        .catch((error): any => {
          console.error("Error adding card:", error);
          // Handle error appropriately
        });
    };

  const handleSubmitDelete =
    (cardId: string | null, listId: string | null) =>
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      deleteCard(cardId, listId, userToken)
        .then((result: any) => {
          console.log("Card deleted successfully:", result);
          setAlert("Card deleted successfully");
          setOpenAlert(true);
          setIsError(false);
          setCardId(null);
          setListId(null);
        })
        .then(() => {
          getCards(userToken).then(() => console.log("Cardssssss"));
          setOpenDelete(false);
        })

        .catch((error: any): any => {
          setAlert("error deleting card");
          setOpenAlert(true);
          setIsError(true);
          console.error("Error deleting card:", error);
          // Handle error appropriately
        });
    };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false); // Close the Snackbar
  };

  //TODO: REFACTOR PROPERTIES 
  //   Group state-related props
  // const stateProps = {
  //   setCardTitle: setTitle,
  //   cardTitle: title,
  //   setCardDescription: setDescription,
  //   cardDescription: description,
  //   position,
  //   setPosition,
  //   open,
  //   openDelete,
  //   setOpenDelete,
  //   openModify,
  //   setOpenModify,
  //   setOpen,
  //   setListId,
  //   setCardId,
  //   openAlert,
  //   alert,
  //   setAlert,
  //   isError,
  // };

  // Group handler props
  // const handlerProps = {
  //   handleSubmit,
  //   handleSubmitModify,
  //   onClickDeleteCard: handleSubmitDelete,
  //   handleCloseAlert,
  // };


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
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                const cards = dataCards?.filter(
                  (card: any) => card.listId === list._id
                );
                return (
                  <>
                    <DataTable
                      titleList={list.title}
                      cards={cards}
                      listId={list._id}
                      handleSubmit={handleSubmit(listId)}
                      handleSubmitModify={handleSubmitModify(cardId)}
                      setCardTitle={setTitle}
                      cardTitle={title}
                      setCardDescription={setDescription}
                      cardDescription={description}
                      position={position}
                      setPosition={setPosition}
                      open={open}
                      openDelete={openDelete}
                      setOpenDelete={setOpenDelete}
                      openModify={openModify}
                      setOpenModify={setOpenModify}
                      setOpen={setOpen}
                      setListId={setListId}
                      setCardId={setCardId}
                      onClickDeleteCard={handleSubmitDelete(cardId, listId)}
                      handleCloseAlert={handleCloseAlert}
                      openAlert={openAlert}
                      alert={alert}
                      setAlert={setAlert}
                      isError={isError}
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./DashboardPage.scss";

import backgroundImage from "../../assets/backgroundImage.jpg";

import MainAppbar from "./components/MainAppbar";

import Navbar from "./components/Navbar";

import DataTable from "./components/DataTable";
import { Box, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
// const listOrder = ["To Do", "In Progress", "In Testing", "Closed"];

export interface CardProps {
  setCardTitle: React.Dispatch<React.SetStateAction<string>>;
  cardTitle: string | null;
  setCardDescription: React.Dispatch<React.SetStateAction<string | null>>;
  cardDescription: string | null;
  setCardId: React.Dispatch<React.SetStateAction<string | null>>;
  position: number | null;
  setPosition: React.Dispatch<React.SetStateAction<number | null>>;
}
export default function DashboardPage() {
  const {
    userToken,
    getCards,
    dataList,
    // setDataList,
    dataCards,
    postCard,
    setListId,
    listId,
    setCardId,
    cardId,
    deleteCard,
    putCard,
    isAuthenticated
  } = useContext(AuthContext);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string | null>("");
  const [position, setPosition] = useState<number | null>(1);

  const [open, setOpen] = React.useState<boolean>(false);
  const [openModify, setOpenModify] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false); // State to control Snackbar
  const [alert, setAlert] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);

  // const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); 
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(listId: string | null) {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

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
        });
    };
  }
  const handleSubmitModify =
    (cardId: string | null) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

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
          setOpenModify(false);
          setCardId(null);
          // setIsError(false);
          setAlert("Card modified successfully");
          // setOpenAlert(true);
        })
        .then(() => {
          getCards(userToken).then(() => {
            console.log("Cards refreshed successfully");
          });
          setOpen(false);
        })

        .catch((error): any => {
          console.error("Error adding card:", error);
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
        });
    };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const listProps = {
    setListId: setListId,
    listId: listId,
  };

  const cardProps: CardProps = {
    setCardTitle: setTitle,
    cardTitle: title,
    setCardDescription: setDescription,
    cardDescription: description,
    setCardId: setCardId,
    position: position,
    setPosition: setPosition,
  };

  const modalProps = {
    open: open,
    setOpen: setOpen,
    openDelete: openDelete,
    setOpenDelete: setOpenDelete,
    openModify: openModify,
    setOpenModify: setOpenModify,
  };

  const alertProps = {
    openAlert: openAlert,
    handleCloseAlert: handleCloseAlert,
    alert: alert,
    setAlert: setAlert,
    isError: isError,
  };

  const handlers = {
    handleSubmit: handleSubmit(listId),
    handleSubmitModify: handleSubmitModify(cardId),
    onClickDeleteCard: handleSubmitDelete(cardId, listId),
  };

  const sortedData = React.useMemo(() => {
    return dataList.map((list: any) => {
      // Create a mapping from cardId to index in the original list.cards array
      const cardOrderMap = list.cards.reduce(
        (acc: any, card: any, index: number) => {
          acc[card["title"]] = index;
          return acc;
        },
        {}
      );
      // Filter and sort the cards according to their UPDATED order in list.cards
      const cards = dataCards
        ?.filter((card: any) => card.listId === list._id)
        .sort((a: any, b: any) => {
          return cardOrderMap[a.title] - cardOrderMap[b.title];
        });
      return { ...list, cards };
    });
  }, [dataList, dataCards]);

  return (
    <>
      {isAuthenticated ? (
        <div
          className="dashboard-container"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
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
            sx={{ overflowX: "auto", scrollBehavior: "smoot", height: "100vh" }}
            // className="custom-scrollbar"
          >
            <DataTable
              sortedData={sortedData}
              listProps={listProps}
              cardProps={cardProps}
              modalProps={modalProps}
              alertProps={alertProps}
              handlers={handlers}
            />
          </Box>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "32px" }}>
            {` Session expired!! redirect to the login page`}
          </Typography>
        </div>
      )}
    </>
  );
}

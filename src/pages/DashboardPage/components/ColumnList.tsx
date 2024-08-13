/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import "../DashboardPage.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddIcon from "@mui/icons-material/Add";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Cards from "./Cards";
import DialogForm from "./DialogForm";
import { AuthContext, Card } from "../../../Context/AuthContext";

import { SortableContext } from "@dnd-kit/sortable";
import { CardProps } from "../DashboardPage";
import { stateProps } from "./DialogForm";

export interface List {
  _id: string;
  title: string;
  cards: Card[];
}
export interface ColumnListProps {
  list: List;
  listProps: {
    setListId: React.Dispatch<React.SetStateAction<string | null>>;
    listId: string | null;
  };
  cardProps: CardProps;
  modalProps: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openDelete: boolean;
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
    openModify: boolean;
    setOpenModify: React.Dispatch<React.SetStateAction<boolean>>;
  };
  alertProps: {
    openAlert: boolean;
    handleCloseAlert: (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => void;
    alert: string | null;
    setAlert: React.Dispatch<React.SetStateAction<string | null>>;
    isError: boolean | null;
  };
  handlers: {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleSubmitModify: (event: React.FormEvent<HTMLFormElement>) => void;
    onClickDeleteCard: (event: React.FormEvent<HTMLFormElement>) => void;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}
export default function ColumnList({
  list,
  listProps,
  cardProps,
  modalProps,
  handlers,
}: ColumnListProps) {
  const handleOpen = () => modalProps.setOpen(true);
  const handleClose = () => modalProps.setOpen(false);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const { deleteList, userToken, getList } = React.useContext(AuthContext);

  const stateProps: stateProps = {
    title: cardProps.cardTitle,
    setCardTitle: cardProps.setCardTitle,
    description: cardProps.cardDescription,
    setDescription: cardProps.setCardDescription,
    position: cardProps.position,
    setPosition: cardProps.setPosition,
    open: modalProps.open,
    setOpen: modalProps.setOpen,
  };
  const cardIds = React.useMemo(
    () => list.cards.map((cardId: any) => cardId._id),
    [list]
  );
  // const cardIds1 = React.useMemo(
  //   () => dataCards.map((dataCard:any)=> dataCard._id), TODO: IMPLMENTATION ALL CARDIDS FOR DRAG AND DROP PORTAL
  //   [dataCards]
  // );

  const handlerProps = {
    handleSubmit: handlers.handleSubmit,
    handleClose: handleClose,
  };

  function onCloseDelete() {
    setOpenDialog(false);
  }

  const onClickDeleteList =
    (listId: string | null) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      deleteList(listId, userToken)
        .then((result: any) => {
          console.log("list deleted successfully:", result);
        })
        .then(() => {
          getList(userToken).then(() =>
            console.log("Lists refreshed successfully")
          );
          setOpenDialog(false);
        })

        .catch((error: any): any => {
          console.error("Error deleting card:", error);
        });
    };
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list._id,
    data: {
      type: "Column",
      list,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "rgba(0,0,0,0.5)",
            maxHeight: "100%",
            width: "272px",
            height: "330px",
            borderRadius: "13px",
            cursor: "pointer",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        ></Paper>
      </div>
    );
  }
  return (
    <div ref={setNodeRef} style={style} >
      <Paper
        elevation={3}
        key={list._id}
        sx={{
          padding: "1px",
          backgroundColor: "#101204",
          color: "#c7d3e0",
          maxHeight: "100%",
          height: "100%",
          width: "272px",
          minWidth: "72px",
          borderRadius: "13px",
          cursor: "pointer",
          overflowY: "auto",
          scrollBehavior: "smooth",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
          {...attributes}
          {...listeners}
        >
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "600",
              lineHeight: "20px",
              overflowWrap: "anywhere",
            }}
            m="15px 15px 5px 15px"
          >
            {list.title}
          </Typography>
          <div></div>
          <MoreHorizIcon
            onClick={() => {
              setOpenDialog(true);
            }}
            sx={{
              fontSize: "12px",
              marginRight: "12px",
              marginBottom: "10px",
            }}
          ></MoreHorizIcon>
        </div>
        <SortableContext items={cardIds}>
          <div
            style={{
              maxHeight: "65vh",
              overflowY: "auto",
              scrollBehavior: "smooth",
              paddingRight: "8px", // Optional: Add padding to avoid scrollbar overlay
            }}
            className="custom-scrollbar"
            // ref={scrollContainerRef}
          >
            {list.cards.map((card: any, index: any) => (
              <Cards
                key={card._id}
                card={card}
                id={index}
                listId={list._id}
                listProps={listProps}
                cardProps={cardProps}
                modalProps={modalProps}
                handlers={handlers}
              />
            ))}
          </div>
        </SortableContext>

        <div>
          <Button
            variant="contained"
            fullWidth
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "5px",
              textTransform: "capitalize",
              backgroundColor: "transparent",
              cursor: "pointer",
              textAlign: "start",
              "&:hover": {
                backgroundColor: "grey",
              },
            }}
            onClick={handleOpen}
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
              <Button
                onClick={() => {
                  listProps.setListId(list._id);
                }}
              >
                <Typography
                  sx={{ textTransform: "capitalize", color: "white" }}
                >
                  Add Card
                </Typography>
              </Button>
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
      <DialogForm
        stateProps={stateProps}
        handlers={handlerProps}
        dialogTitle="Adding a new task"
      />
      <Dialog open={openDialog} onClose={onCloseDelete}>
        <DialogTitle>{"Are you sure you want to delete this list"}</DialogTitle>
        <DialogContent>
          <button
            type="button"
            className="cancel-button"
            onClick={onClickDeleteList(list._id)}
            style={{ backgroundColor: "red", marginRight: "10px" }}
          >
            Delete
          </button>
          <button onClick={onCloseDelete} className="submit-button">
            Back
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

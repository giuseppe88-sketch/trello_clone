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
import DialogComp from "./DialogComp";
import { AuthContext } from "../../../Context/AuthContext";

import { SortableContext } from "@dnd-kit/sortable";
export interface ColumnListProps {
  list: Array<{
    _id: string;
    title: string;
    cards: Array<{
      _id: string;
      title: string;
      description: string;
      position: number;
      listId: string;
    }>;
  }>;
  listProps: {
    setListId: React.Dispatch<React.SetStateAction<string | null>>;
    listId: string | null;
  };
  cardProps: {
    setCardTitle: React.Dispatch<React.SetStateAction<string>>;
    cardTitle: string;
    setCardDescription: React.Dispatch<React.SetStateAction<string>>;
    cardDescription: string;
    setCardId: React.Dispatch<React.SetStateAction<string | null>>;
    position: number | null;
    setPosition: React.Dispatch<React.SetStateAction<number | null>>;
  };
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
  // list:any
  // cards: [];
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

  const stateProps = {
    title: cardProps.cardTitle,
    setCardTitle: cardProps.setCardTitle,
    description: cardProps.cardDescription,
    setDescription: cardProps.setCardDescription,
    position: cardProps.position,
    setPosition: cardProps.setPosition as React.Dispatch<
      React.SetStateAction<number>
    >,
    open: modalProps.open,
    setOpen: modalProps.setOpen,
  };
  const cardIds = React.useMemo(
    () => list.cards.map((cardId: any) => cardId._id),
    [list]
  );

  const handlerProps = {
    handleSubmit: handlers.handleSubmit,
    handleClose: handleClose,
  };

  function onCloseDelete() {
    setOpenDialog(false);
  }

  const onClickDeleteList =
    (listId: string | null) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("triggered onClickDeleteList");
      deleteList(listId, userToken)
        .then((result: any) => {
          console.log("list deleted successfully:", result);
          // setAlert("Card deleted successfully");
          // setOpenAlert(true);
          // setIsError(false);
          // setCardId(null);
          // setListId(null);
        })
        .then(() => {
          getList(userToken).then(() => console.log("List"));
          setOpenDialog(false);
        })

        .catch((error: any): any => {
          // setAlert("error deleting card");
          // setOpenAlert(true);
          // setIsError(true);
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
    <div ref={setNodeRef} style={style}>
      <Paper
        elevation={3}
        sx={{
          padding: "1px",
          backgroundColor: "#101204",
          color: "#c7d3e0",
          // color: "#d9e5f1",
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
              maxHeight: "300px",
              overflowY: "auto",
              scrollBehavior: "smooth",
              paddingRight: "8px", // Optional: Add padding to avoid scrollbar overlay
            }}
            className="custom-scrollbar"
            // ref={scrollContainerRef}
          >
            {list.cards.map((card: any, index: any) => (
              <Cards
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
                padding: "10px",
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
      <DialogComp
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
            // onClick={onClickDeleteList}
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

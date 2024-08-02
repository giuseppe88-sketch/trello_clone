/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
} from "@mui/material";

import NotesIcon from "@mui/icons-material/Notes";
import EditIcon from "@mui/icons-material/Edit";
import DialogComp from "./DialogComp";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface CardsProps {
  card: any;
  id: any;
  listId: string;
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
  handlers: {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleSubmitModify: (event: React.FormEvent<HTMLFormElement>) => void;
    onClickDeleteCard: (event: any) => void;
  };
}

function Cards({
  card,
  id,
  listId,
  listProps,
  cardProps,
  modalProps,
  handlers,
}: CardsProps) {
  const backgroundColor: { [key: number]: string } = {
    1: "#206A83",
    2: "#216E4E",
    3: "#AE2E24",
    4: "#A54800",
    5: "#5E4DB2",
  };

  const handleCloseDelete = () => {
    modalProps.setOpenDelete(false);
  };
  const handleOpenDelete = () => {
    modalProps.setOpenDelete(true);
  };

  const handleCloseModify = () => {
    modalProps.setOpenModify(false);
  };
  const handleOpen = () => modalProps.setOpenModify(true);
  // const handleClose = () => setOpenModify(false);

  const handleClickDeleteCard = (
    cardId: string | null,
    listId: string | null
  ) => {
    listProps.setListId(listId);
    cardProps.setCardId(cardId);
    handleOpenDelete();
  };
  const handleClickModifyCard = (cardId: string | null) => {
    cardProps.setCardId(cardId);
    handleOpen();
    modalProps.setOpenModify(true);
  };
  const stateProps = {
    // listTitle,
    cardTitle: cardProps.cardTitle,
    setCardTitle: cardProps.setCardTitle,
    description: cardProps.cardDescription,
    setDescription: cardProps.setCardDescription,
    position: cardProps.position,
    setPosition: cardProps.setPosition as React.Dispatch<
      React.SetStateAction<number>
    >,
    open: modalProps.openModify,
    setOpen: modalProps.setOpenModify,
  };

  // const [openDelete, setOpenDelete] = React.useState(false);
  const handlerProps = {
    handleSubmit: handlers.handleSubmitModify,
    handleClose: handleCloseModify,
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card._id,
    data: {
      type: "Card",
      card,
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
            padding: "10px",
            color: "#B6C2CF",
            margin: "10px",
            backgroundColor: "#22272af1",
            opacity:.75,
            borderRadius: "2px",
            boxShadow: "inset 4px 4px 8px rgba(0, 0, 0, 0.1)",
            height:"20px"
          }}
        ></Paper>
      </div>
    );
  }

  return (
    <div>
      <div ref={setNodeRef} style={style}>
        <Box key={card._id} id={id}>
          <Paper
            {...attributes}
            {...listeners}
            id={card._id}
            elevation={1}
            sx={{
              padding: "10px",
              margin: "8px 2px 8px 5px",
              color: "#B6C2CF",
              backgroundColor: "#22272bf5",
              borderRadius: "10px",
              boxShadow: "inset 4px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Tooltip title={`position ${card.position}`}>
                  <Box
                    className="icon-position"
                    sx={{
                      backgroundColor: backgroundColor[card.position],
                    }}
                  >
                    <Typography color="white" fontSize="12px">
                      {card.position}
                    </Typography>
                  </Box>
                </Tooltip>
                <Tooltip title={"Delete"}>
                  <EditIcon
                    onClick={() => {
                      console.log(card._id, listId);
                      handleClickDeleteCard(card._id, listId);
                    }}
                    sx={{
                      fontSize: "13px",
                      cursor: "pointer",
                      "&:hover": {
                        color: "grey",
                      },
                    }}
                  />
                </Tooltip>
              </div>

              <div>
                <Typography
                  onClick={() => handleClickModifyCard(card._id)}
                  sx={{
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    lineHeight: "20px",
                    cursor: "pointer",
                  }}
                >
                  {card.description}
                </Typography>
              </div>
              <Tooltip title={"Edit"}>
                <NotesIcon
                  onClick={() => handleClickModifyCard(card._id)}
                  sx={{
                    fontSize: "12px",
                    cursor: "pointer",
                    "&:hover": {
                      color: "grey",
                    },
                  }}
                ></NotesIcon>
              </Tooltip>
            </Box>
          </Paper>
        </Box>
        <Dialog open={modalProps.openDelete} onClose={handleCloseDelete}>
          <DialogTitle>
            {"Are you sure you want to delete this card from your list?"}
          </DialogTitle>
          <DialogContent>
            <button
              type="button"
              className="cancel-button"
              onClick={handlers.onClickDeleteCard}
              style={{ backgroundColor: "red", marginRight: "10px" }}
            >
              Delete
            </button>
            <button onClick={handleCloseDelete} className="submit-button">
              Back
            </button>
          </DialogContent>
        </Dialog>
        <DialogComp stateProps={stateProps} handlers={handlerProps} />
      </div>
    </div>
  );
}

export default Cards;

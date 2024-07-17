/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from "@mui/material";

import NotesIcon from "@mui/icons-material/Notes";
import EditIcon from "@mui/icons-material/Edit";

export interface CardsProps {
  cards: any[] | undefined;
  listId: string;
  setListId: (listId: string | null) => void;
  setCardId: (cardId: string | null) => void;
  setOpenDelete: (open: boolean) => void;
  openDelete: boolean;
  onClickDeleteCard: any;
  openModify: boolean;
  titleList: string;
  handleSubmitModify: React.FormEventHandler<HTMLFormElement>;
  cardTitle: string;
  setCardTitle: (title: string) => void;
  cardDescription: string;
  setCardDescription: (description: string) => void;
  setPosition: (position: number) => void;
  position: number | null;
  setOpenModify: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cards({
  cards,
  listId,
  setListId,
  setCardId,
  setOpenDelete,
  openDelete,
  onClickDeleteCard,
  openModify,
  titleList,
  handleSubmitModify,
  cardTitle,
  setCardTitle,
  cardDescription,
  setCardDescription,
  position,
  setPosition,
  setOpenModify,
}: CardsProps) {
  const backgroundColor: { [key: number]: string } = {
    1: "#206A83",
    2: "#216E4E",
    3: "#AE2E24",
    4: "#A54800",
    5: "#5E4DB2",
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleOpenModify = () => {
    setOpenModify(true);
  };

  const handleCloseModify = () => {
    setOpenModify(false);
  };

  const handleClickDeleteCard = (
    cardId: string | null,
    listId: string | null
  ) => {
    setListId(listId);
    setCardId(cardId);
    handleOpenDelete();
  };
  const handleClickModifyCard = (cardId: string | null) => {
    setCardId(cardId);
    handleOpenModify();
  };

  return (
    <>
      {cards?.map((card: any) => (
        <Box key={card.id}>
          <Paper
            id={card.id}
            key={card.id}
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
                    onClick={() => handleClickDeleteCard(card._id, listId)}
                    sx={{
                      fontSize: "13px",
                      cursor: "pointer",
                      "&:hover": {
                        color: "grey",
                      },
                    }}
                  />
                </Tooltip>
                <Dialog open={openDelete} onClose={handleCloseDelete}>
                  <DialogTitle>
                    {
                      "Are you sure you want to delete this card from your list?"
                    }
                  </DialogTitle>
                  <DialogContent>
                    <button
                      onClick={onClickDeleteCard}
                      // variant="contained"
                      // color="primary"
                      // size="small"
                    >
                      Delete
                    </button>
                    <Button onClick={handleCloseDelete}>Come back</Button>
                  </DialogContent>
                </Dialog>
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
              <Dialog
                open={openModify}
                onClose={handleCloseModify}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  color: "white",
                }}
                PaperProps={{
                  sx: { backgroundColor: "#3e4b57", color: "white" },
                }}
              >
                <DialogTitle
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                  className="dialog-title"
                >
                  {`Modify Task to `}
                  {titleList}
                </DialogTitle>
                <DialogContent>
                  <form onSubmit={handleSubmitModify}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="title"
                      label={card.title}
                      type="text"
                      fullWidth
                      value={cardTitle}
                      onChange={(event: any) => {
                        setCardTitle(event.target.value);
                      }}
                      InputProps={{
                        sx: {
                          color: "#fff", // Change text color
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ccc", // Change border color
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#fff",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#ccc",
                          "&.Mui-focused": {
                            color: "white",
                          },
                        },
                      }}
                    />
                    <TextField
                      margin="dense"
                      id="description"
                      label={card.description}
                      type="text"
                      fullWidth
                      value={cardDescription}
                      onChange={(event: any) => {
                        setCardDescription(event.target.value);
                      }}
                      InputProps={{
                        sx: {
                          color: "#fff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#B6C2CF",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#B6C2CF",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#B6C2CF",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#B6C2CF",
                          "&.Mui-focused": {
                            color: "#B6C2CF",
                          },
                        },
                      }}
                    />

                    <TextField
                      margin="dense"
                      id="number"
                      label={`${card.position}`}
                      type="number"
                      value={position}
                      onChange={(e) => {
                        setPosition(parseInt(e.target.value));
                      }}
                      inputProps={{ min: 1, max: 5 }}
                      fullWidth
                      InputProps={{
                        sx: {
                          color: "#B6C3CD",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#B6C2CF",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#B6C2CF",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#B6C2CF",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "#B6C2CF",
                          "&.Mui-focused": {
                            color: "#B6C2CF",
                          },
                        },
                      }}
                    />
                    <DialogActions>
                      <button
                        type="button"
                        onClick={handleCloseModify}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="submit-button">
                        Submit
                      </button>
                    </DialogActions>
                  </form>
                </DialogContent>
              </Dialog>
            </Box>
          </Paper>
        </Box>
      ))}
    </>
  );
}

export default Cards;

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
import "../DashboardPage.scss";
import { Snackbar, Alert, Divider } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotesIcon from "@mui/icons-material/Notes";
import EditIcon from "@mui/icons-material/Edit";

export interface DataTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cards?: any[];
  handleAddCard?: () => void;
  handleDeleteCard?: () => void;
  titleList: string;
  listId: string;
  setNewCardTitle: (title: string) => void;
  setNewCardDescription: (description: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  open: boolean;
  openAlert: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // handleSubmit: (listId:string) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  position: number | null;
  alert: string | null;
  isError: boolean | null;
  setPosition: (position: number | null) => void;
  setOpenDelete: (open: boolean) => void;
  openDelete: boolean;
  setListId: (listId: string | null) => void;
  setCardId: (cardId: string | null) => void;
  onClickDeleteCard: (cardId: string | null, listId: string | null) => void;
  handleCloseAlert?: (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
}

function DataTable({
  titleList,
  listId,
  cards,
  setNewCardTitle,
  setNewCardDescription,
  position,
  setPosition,
  handleSubmit,
  setOpen,
  open,
  setListId,
  setCardId,
  onClickDeleteCard,
  openDelete,
  setOpenDelete,
  openAlert,
  isError,
  alert,
  handleCloseAlert,
}: DataTableProps) {
  // const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClick = () => {
    setListId(listId);
  };

  const handleClickDeleteCard = (
    cardId: string | null,
    listId: string | null
  ) => {
    setListId(listId);
    setCardId(cardId);
    handleOpenDelete();
  };

  return (
    <div>
      <Box key={listId} flex={1}>
        <Paper
          elevation={3}
          sx={{
            padding: "1px",
            backgroundColor: "#101204",
            color: "#c7d3e0",
            // color: "#d9e5f1",
            maxHeight: "100%",
            width: "272px",
            // minWidth:"272px",
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
              {titleList}
            </Typography>
            <div></div>
            <MoreHorizIcon
              sx={{
                fontSize: "12px",
                marginRight: "12px",
                marginBottom: "10px",
              }}
            ></MoreHorizIcon>
          </div>
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
            {cards?.map((card: any) => (
              <>
                <Paper
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
                      <div
                        className="icon-position"
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          paddingLeft: "8px",
                        }}
                      >
                        <Typography color="white" fontSize="12px">
                          4
                        </Typography>
                      </div>
                      <Tooltip title="Delete">
                        <EditIcon
                          onClick={() =>
                            handleClickDeleteCard(card._id, listId)
                          }
                          sx={{
                            fontSize: "13px",
                            cursor: "pointer",
                            "&:hover": {
                              color: "grey", // Change color on hover
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
                          <Button
                            onClick={onClickDeleteCard}
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Delete
                          </Button>
                          <Button onClick={handleCloseDelete}>Come back</Button>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          letterSpacing: "0.5px",
                          lineHeight: "20px",
                        }}
                      >
                        {card.description}
                      </Typography>
                    </div>
                    <NotesIcon sx={{ fontSize: "12px" }}></NotesIcon>
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
                <Button onClick={handleClick}>
                  <Typography
                    sx={{ textTransform: "capitalize", color: "white" }}
                  >
                    Add Card
                  </Typography>
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
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
                    {`Adding new Task to `}
                    {titleList}
                  </DialogTitle>
                  <DialogContent>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        onChange={(event: any) => {
                          setNewCardTitle(event.target.value);
                        }}
                        InputProps={{
                          sx: {
                            color: "#fff", // Change text color
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#ccc", // Change border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#fff", // Change border color on hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "white", // Change border color when focused
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: "#ccc", // Change label color
                            "&.Mui-focused": {
                              color: "white", // Change label color when focused
                            },
                          },
                        }}
                      />
                      <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        onChange={(event: any) => {
                          setNewCardDescription(event.target.value);
                        }}
                        InputProps={{
                          sx: {
                            color: "#fff", // Change text color
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#B6C2CF", // Change border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#B6C2CF", // Change border color on hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#B6C2CF", // Change border color when focused
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: "#B6C2CF", // Change label color
                            "&.Mui-focused": {
                              color: "#B6C2CF", // Change label color when focused
                            },
                          },
                        }}
                      />

                      <TextField
                        margin="dense"
                        id="number"
                        label="Number (1-5)"
                        type="number"
                        value={position}
                        onChange={(e) => {
                          setPosition(parseInt(e.target.value));
                        }}
                        inputProps={{ min: 1, max: 5 }}
                        fullWidth
                        InputProps={{
                          sx: {
                            color: "#B6C2CF", // Change text color
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#B6C2CF", // Change border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#B6C2CF", // Change border color on hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#B6C2CF", // Change border color when focused
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: "#B6C2CF", // Change label color
                            "&.Mui-focused": {
                              color: "#B6C2CF", // Change label color when focused
                            },
                          },
                        }}
                      />
                      <DialogActions>
                        <button onClick={handleClose} className="cancel-button">
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
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={isError ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {alert}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}

export default DataTable;

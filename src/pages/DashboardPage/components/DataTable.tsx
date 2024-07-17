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
} from "@mui/material";
import "../DashboardPage.scss";
import { Snackbar, Alert } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Cards from "./Cards";

export interface DataTableProps {
  cards: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAddCard?: () => void;
  handleDeleteCard?: () => void;
  titleList: string;
  cardTitle: string;
  cardDescription: string;
  listId: string;
  setCardTitle: (title: string) => void;
  setCardDescription: (description: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModify: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  openModify: boolean;
  openAlert: boolean;
  position: number | null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // handleSubmit: (listId:string) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleSubmitModify: React.FormEventHandler<HTMLFormElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alert: string | null;
  isError: boolean | null;
  setPosition: (position: number) => void;
  setOpenDelete: (open: boolean) => void;
  openDelete: boolean;
  setListId: (listId: string | null) => void;
  setCardId: (cardId: string | null) => void;
  setAlert: React.Dispatch<React.SetStateAction<string | null>>;
  onClickDeleteCard: any;
  handleCloseAlert?: (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
}

function DataTable({
  cards,
  titleList,
  listId,
  setCardTitle,
  cardTitle,
  setCardDescription,
  cardDescription,
  position,
  setPosition,
  handleSubmit,
  handleSubmitModify,
  setOpen,
  open,
  setListId,
  setCardId,
  onClickDeleteCard,
  openDelete,
  setOpenDelete,
  openModify,
  setOpenModify,
  openAlert,
  isError,
  alert,
  handleCloseAlert,
}: DataTableProps) {
  // const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => {
    setListId(listId);
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
            <Cards
              cards={cards}
              listId={listId}
              setListId={setListId}
              setCardId={setCardId}
              setOpenDelete={setOpenDelete}
              openDelete={openDelete}
              onClickDeleteCard={onClickDeleteCard}
              openModify={openModify}
              titleList={titleList}
              handleSubmitModify={handleSubmitModify}
              cardTitle={cardTitle}
              setCardTitle={setCardTitle}
              cardDescription={cardDescription}
              setCardDescription={setCardDescription}
              setPosition={setPosition}
              position={position}
              setOpenModify={setOpenModify}
            />
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
                          setCardTitle(event.target.value);
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
                          setCardDescription(event.target.value);
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
                        <button
                          onClick={() => setOpen(false)}
                          className="cancel-button"
                          // type="button" TODO: ADD THIS
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

import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Modal,
  TextField,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "../DashboardPage.scss";

import AddIcon from "@mui/icons-material/Add";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotesIcon from "@mui/icons-material/Notes";

export interface DataTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cards?: any[];
  handleAddCard?: () => void;
  titleList: string;
  listId: string;
  setNewCardTitle: (title: string) => void;
  setNewCardDescription: (description: string) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  position: number;
  setPosition: (position: number) => void;
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
}: DataTableProps) {
  //   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

                    {/* <div>
                      <Typography fontSize="18px">{card.title}</Typography>
                    </div> */}
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
                    <NotesIcon fontSize="12px"></NotesIcon>
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
                  backgroundColor: "grey", // Change color on hover
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
                <Typography>Add Card</Typography>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  // Remove BackdropProps and handle backdrop click in onClose
                >
                  <DialogTitle>
                    {`Adding new Task to `}
                    {titleList}{listId}
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
                      />
                      <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                          Cancel
                        </Button>
                        <Button type="submit" color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </form>
                  </DialogContent>
                </Dialog>
                {/* <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  backdrop={{ onClick: handleClose }}

                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {titleList}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="title"
                          label="Title"
                          type="text"
                          fullWidth
                          onChange={(e) => setNewCardTitle(e.target.value)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="description"
                          label="Description"
                          type="text"
                          fullWidth
                          onChange={(e) =>
                            setNewCardDescription(e.target.value)
                          }
                        />
                        <Button type="submit" variant="contained">
                          SUBMIT
                        </Button>
                    </form>
                  </Box>
                </Modal> */}
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
    </div>
  );
}

export default DataTable;

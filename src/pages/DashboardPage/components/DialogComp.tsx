/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export interface handlerProps {
  handleClose: () => void;
  handleSubmit: (event: any) => void;
}

export interface stateProps {
  title?: string;
  description?: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  position?: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setCardTitle: React.Dispatch<React.SetStateAction<string>>;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle?: string;
}
type Props = {
  handlers: handlerProps;
  stateProps: stateProps;
  dialogTitle?: string;
  type?: string;
};
function DialogComp({ handlers, stateProps, dialogTitle, type }: Props) {
  const { handleClose, handleSubmit } = handlers;
  const {
    title,
    setCardTitle,
    description,
    setDescription,
    position,
    setPosition,
    open,
  } = stateProps;

  return (
    <div>
      {" "}
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
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label={"title"}
              type="text"
              fullWidth
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
            {description !== undefined && (
              <TextField
                margin="dense"
                id="description"
                label={"description"}
                type="text"
                fullWidth
                value={description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(event.target.value);
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
            )}

            {position && (
              <TextField
                margin="dense"
                id="number"
                label={"position"}
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
            )}
            <DialogActions>
              <button
                type="button"
                onClick={handleClose}
                className="cancel-button"
                // type="button" TODO: ADD THIS
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="submit-button"
              >
                Submit
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogComp;

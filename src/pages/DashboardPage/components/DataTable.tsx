/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import "../DashboardPage.scss";

import ColumnList from "./ColumnList";

export interface DataTableProps {
  sortedData: Array<{
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
}
function DataTable({
  sortedData,
  listProps,
  cardProps,
  modalProps,
  alertProps,
  handlers,
}:
DataTableProps) {
  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        p={1}
        justifyContent="flex-start"
        gap={"10px"}
        ml={"10px"}
      >
        <ColumnList
          sortedData={sortedData}
          listProps={listProps}
          cardProps={cardProps}
          modalProps={modalProps}
          alertProps={alertProps}
          handlers={handlers}
        />
        <Snackbar
          open={alertProps.openAlert}
          autoHideDuration={6000}
          onClose={alertProps.handleCloseAlert}
        >
          <Alert
            onClose={alertProps.handleCloseAlert}
            severity={alertProps.isError ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {alertProps.alert}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}

export default DataTable;

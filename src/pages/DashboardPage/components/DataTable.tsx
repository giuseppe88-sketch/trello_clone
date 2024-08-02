/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Snackbar, Alert, Paper, Typography, Button } from "@mui/material";
import "../DashboardPage.scss";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { AuthContext } from "../../../Context/AuthContext";

import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";

import ColumnList from "./ColumnList";
import { createPortal } from "react-dom";
import Cards from "./Cards";
import AddIcon from "@mui/icons-material/Add";
import DialogComp from "./DialogComp";
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
}: DataTableProps) {
  const [activeColumn, setActiveColumn] = React.useState<any>(null);
  const [activeCard, setActiveCard] = React.useState<any>(null);
  const { setData, moveCard, userToken, getCards, data } =
    React.useContext(AuthContext);

    const [open, setOpen]=React.useState(null)

  const columnsId = React.useMemo(
    () => sortedData.map((list) => list._id),
    [sortedData]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function handleDragStart(event: any) {
    if (event.active.data.current.type === "Column") {
      setActiveColumn(event.active.data.current.list);
    }
    if (event.active.data.current.type === "Card") {
      setActiveCard(event.active.data.current.card);
    }
  }

  const handleDragEnd = React.useCallback(
    (event) => {
      setActiveColumn(null);
      setActiveCard(null);
      const { over, active } = event;
      console.log(event);

      if (!over) return;

      let activeCardIndex: number;
      let overCardIndex: number;

      for (const column of sortedData) {
        const cardIndex = column.cards.findIndex(
          (card) => card._id === active.id
        );
        if (cardIndex !== -1) {
          overCardIndex = column.cards.findIndex(
            (card) => card._id === over.id
          );
          activeCardIndex = cardIndex;
          break;
        }
      }
      const activeColumnIndex = sortedData.findIndex(
        (column) => column._id === active.id
      );
      const overColumnIndex = sortedData.findIndex(
        (column) => column._id === over.id
      );
      const activeColumnId = active.id;
      const overColumnId = over.id;

      const isActiveATask = active.data.current.type === "Card";
      const isOverATask = over.data.current.type === "Card";

      if (activeColumnIndex !== -1 || overColumnIndex !== -1) {
        setData((data: any[]) => {
          const activeColumn = data.findIndex(
            (data) => data._id === activeColumnId
          );

          const overColumn = data.findIndex(
            (data) => data._id === overColumnId
          );

          return arrayMove(sortedData, overColumn, activeColumn);
        });
      } else if (activeCardIndex !== -1 && overCardIndex !== -1) {
        const newColumns = [...sortedData];
        // Find the active column containing the active card
        let activeColumn;
        newColumns.forEach((column) => {
          if (column.cards.some((card) => card._id === active.id)) {
            activeColumn = column;
          }
        });

        if (activeColumn) {
          const oldIndex = activeColumn.cards.findIndex(
            (objCard) => objCard._id === active.id
          );
          const newIndex = activeColumn.cards.findIndex(
            (objCard) => objCard._id === over.id
          );

          if (oldIndex !== -1 && newIndex !== -1) {
            activeColumn.cards = arrayMove(
              activeColumn.cards,
              oldIndex,
              newIndex
            );
          }
        }
        setData(newColumns);
      } else if (isActiveATask && isOverATask) {
        console.log("ActiveATask");

        const activeTaskId = active.id;
        // const overTaskId = over.id;
        const overTaskColumnId = over.data.current.card["listId"];

        moveCard(activeTaskId, userToken, overTaskColumnId)
          .then((result: any) => {
            console.log("result", result);
          })
          .then(() => {
            getCards(userToken).then(() => {
              console.log("Cards refreshed successfully");
            });
          })

          .catch((error: any): any => {
            console.error("Error adding card:", error);
          });
      }
    },
    [setData, sortedData]
  );
  function handleDragOver(event: any) {
    const { active, over } = event;
    console.log(event);
    if (over && over.data.current.type === "Column") {
      console.log("Dragged over a Column");
    }
  }

  // const stateProps = {
  //   open,
  //   cardTitle:
  // };

  return (
    <div>
      <DndContext
        onDragOver={handleDragOver}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={columnsId}>
          <Box
            display="flex"
            flexDirection="row"
            p={1}
            justifyContent="flex-start"
            gap={"10px"}
            ml={"10px"}
          >
            {sortedData &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              sortedData.map((list: any) => (
                <Box key={list._id}>
                  <ColumnList
                    key={list._id}
                    list={list}
                    listProps={listProps}
                    cardProps={cardProps}
                    modalProps={modalProps}
                    alertProps={alertProps}
                    handlers={handlers}
                  />
                </Box>
              ))}
            <Paper
              elevation={3}
              sx={{
                padding: "1px",
                backgroundColor: "#ffffff3d",
                maxHeight: "50px",
                width: "272px",
                borderRadius: "13px",
              }}
            >
              <Button>
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginLeft: "20px",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <AddIcon />
                  <Typography sx={{ padding: "5px", fontWeight: "500" }}>
                    Add another list
                  </Typography>
                </Box>
              </Button>
            </Paper>
            {/* <DialogComp stateProps={stateProps} handlers={handlers} /> */}
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
        </SortableContext>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnList
                list={activeColumn}
                listProps={listProps}
                cardProps={cardProps}
                modalProps={modalProps}
                alertProps={alertProps}
                handlers={handlers}
              ></ColumnList>
            )}
            {activeCard && (
              <Cards
                card={activeCard}
                listProps={listProps}
                cardProps={cardProps}
                modalProps={modalProps}
                handlers={handlers}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

export default DataTable;

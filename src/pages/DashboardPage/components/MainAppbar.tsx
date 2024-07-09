import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AppsIcon from "@mui/icons-material/Apps";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslation } from "react-i18next";
import "./MainAppbar.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface MainAppbarProps {
  newCardContent: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainAppbar: React.FC<MainAppbarProps> = ({
  newCardContent,
  onSearchChange,
}) => {
  const { t } = useTranslation(["MainAppbar"]); // load multiple namespaces


  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#dfe1e6", // Set the default border color to grey
                border: "0.5px solid #dfe1e6",
                boxShadow: "inset 0 0 0 1px #738496",
              },
              "&:hover fieldset": {
                backgroundColor: "#5f6e8810", // Set the background
                // backgroundColor: "#0000003d", // Set the background
              },
              "&.Mui-focused fieldset": {
                borderColor: "#dfe1e6", // Set the border color when focused to grey
                boxShadow: "inset 0 0 0 1px #738496",
                border: "0.5px solid",
              },
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&::placeholder": {
              color: "grey", // Set the placeholder text color to grey
              opacity: 1, // Ensure the placeholder text is fully opaque
            },
            fontSize: "0.7rem", // Set the font size of the input text
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>

    <AppBar
      className="main-bar"
      position="static"
      style={{
        padding: "2px",
        margin: "0 auto",
        width: "100%",
        backgroundColor: "#1D2125",
        borderBottom: "0.1px solid hsla(211,18%,68%,0.16)",
      }}
    >
      <Toolbar className="toolbar">
        <div className="toolbar-items">
          <AppsIcon
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "grey", // Change color on hover
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1px",
              cursor: "pointer",
              padding: "7px",
              borderRadius: "5px",
              transition: "background-color 0.1s ease",
              ml: "12px",
              "&:hover": {
                backgroundColor: "#5f6e8833",
              },
            }}
          >
            <AnalyticsIcon />
            <Typography>Trello Clone</Typography>
            <ExpandMoreIcon />
          </Box>
          <Box className="toolbar-item" ml="5px" p="7px">
            <Typography>{t("appbar.workspaces")}</Typography>
            <ExpandMoreIcon />
          </Box>
          <Box className="toolbar-item">
            <Typography>{t("appbar.recent")}</Typography>
            <ExpandMoreIcon />
          </Box>
          <Box className="toolbar-item">
            <Typography>{t("appbar.starred")}</Typography>
            <ExpandMoreIcon />
          </Box>
          <Box className="toolbar-item">
            <Typography>{t("appbar.templates")}</Typography>
            <ExpandMoreIcon />
          </Box>
          <div style={{ display: "flex", marginLeft: "5px" }}>
            <Button
              sx={{ textTransform: "capitalize", color: "black" }}
              variant="contained"
              color="primary"
              size="small"
            >
              {t("appbar.create")}
            </Button>
          </div>
        </div>
        <div></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <TextField
              fullWidth
              placeholder={t("search.placeholder")}
              value={newCardContent}
              onChange={onSearchChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "grey", cursor: "pointer" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <CircleNotificationsIcon
              color={"info"}
              sx={{
                marginLeft: "8px",
                cursor: "pointer",
                "&:hover": {
                  color: "grey",
                },
              }}
              fontSize="large"
            />
          </Box>
          <Box>
            <HelpIcon
              fontSize="small"
              sx={{
                marginLeft: "8px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "grey",
                  borderRadius: "15px",
                },
              }}
            />
          </Box>
          <Box>
            <AccountCircleIcon
              color={"info"}
              sx={{
                marginLeft: "8px",
                fontSize: "1.7rem",
                cursor: "pointer",
                "&:hover": {
                  color: "grey",
                },
              }}
            />
          </Box>
        </div>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
};

export default MainAppbar;

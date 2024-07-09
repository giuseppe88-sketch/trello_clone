import React from "react";
import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PeopleIcon from "@mui/icons-material/People";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useTranslation } from "react-i18next";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const { t } = useTranslation(["Navbar"]); // load multiple namespaces

  return (
    <AppBar
      position="static"
      className="navbar-container"
      sx={{ backgroundColor: "rgba(35, 44, 46, 0.6)" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              cursor: "pointer",
              "&:hover": {
                color: "grey",
                transition: "color 0.3s ease",
              },
            }}
          >
            {t("navbar.devs_project")}
          </Typography>
          <StarBorderIcon
            fontSize="small"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "grey",
                transition: "color 0.2s ease",
              },
            }}
          />
          <PeopleIcon
            fontSize="small"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "grey",
                transition: "color 0.2s ease",
              },
            }}
          />
          <Box>
            <Button
              sx={{
                textTransform: "capitalize",
                color: "#172B4D",
                padding: "6px",
                backgroundColor: "#DCDFE4",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              <StackedBarChartIcon
                fontSize="small"
                sx={{
                  marginRight: "2px",
                  backgroundColor: "white",
                  borderRadius: "3px",
                  color: "#172B4D",
                }}
              />
              <Typography sx={{ fontWeight: 600 }}>
                {t("navbar.board")}
              </Typography>
            </Button>
            <Button
              className="button-icon"
              sx={{
                backgroundColor: "#DCDFE4",
                color: "#172B4D",
                marginLeft: "5px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              variant="contained"
              color="primary"
            >
              <KeyboardArrowDownIcon sx={{ color: "#172B4D" }} />
            </Button>
          </Box>
        </Box>
        <Box></Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RocketLaunchIcon
            sx={{
              marginRight: "6px",
              fontSize: "1.2rem",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#5f6e8833",
              },
            }}
            fontSize="small"
          />
          <BoltIcon
            sx={{
              fontSize: "1.2rem",
              marginRight: "6px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#5f6e8833",
              },
            }}
            fontSize="small"
          />
          <Button
            sx={{
              textTransform: "capitalize",
              color: "white",
              padding: "6px",
              background: "transparent",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#5f6e8833",
              },
            }}
            variant="contained"
            color="primary"
            size="small"
          >
            <FilterListIcon
              fontSize="small"
              sx={{
                marginRight: "8px",
                borderRadius: "3px",
                background: "transparent",
              }}
            />
            <Typography sx={{ fontWeight: 600 }}>
              {t("navbar.filters")}
            </Typography>
          </Button>
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
          <Button
            sx={{
              textTransform: "capitalize",
              color: "black",
              padding: "6px",
              backgroundColor: "#DCDFE4",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            variant="contained"
            color="primary"
            size="small"
          >
            <PersonAddIcon
              fontSize="small"
              sx={{
                marginRight: "2px",
                backgroundColor: "white",
                borderRadius: "3px",
              }}
            />
            <Typography sx={{ fontWeight: 600, color: "#172B4D" }}>
              {t("navbar.share")}
            </Typography>
          </Button>
          <DehazeIcon
            sx={{
              fontSize: "1.2rem",
              cursor: "pointer",
              color: "white",
              "&:hover": {
                backgroundColor: "#5f6e8833",
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

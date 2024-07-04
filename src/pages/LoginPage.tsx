/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext } from "react";
import "./LoginPage.scss";

import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Snackbar, Alert } from "@mui/material";
import Divider from "@mui/material/Divider";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GoogleIcon from "@mui/icons-material/Google";

import { AuthContext } from "../Context/AuthContext";

export default function LoginPage() {
  const { loginRequest } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openErrorAlert, setOpenErrorAlert] = useState<boolean>(false); // State to control Snackbar
  const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false); // State to control Snackbar
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await loginRequest(username, password)
      .then((result: any) => {
        if (!result.user) {
          console.error(result.message);
          setErrorAlert(result.message);
          setOpenErrorAlert(true); // Open the Snackbar on error
          return;
        } else {
          navigate("/");
          setOpenSuccessAlert(true); // Open the Snackbar on success
          setSuccessAlert("Successfully Logged Ine");
          setUsername("");
          setPassword("");
        }
      })
      .catch((error: any) => console.log("error", error));
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorAlert(false); // Close the Snackbar
    setOpenSuccessAlert(false);
  };

  return (
    <div className="login-container">
      <Container component="main" className="container">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 1,
            borderRadius: "10px",
            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
            height: "640px",
          }}
        >
          <>
            <Avatar sx={{ m: 1, mt: 6, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 5,
              width: "85%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                textTransform: "capitalize",
                backgroundColor: "#004687",
                "&:hover": {
                  backgroundColor: "#B0C4DE",
                  color: "#000",
                },
              }}
            >
              {" Sign In"}
            </Button>
            <Divider />
            <Typography
              sx={{
                margin: "0 auto",
                color: "#707070	",
                textTransform: "capitalize",
              }}
            >
              OR
            </Typography>
            <Divider />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#FFFFFF",
                textTransform: "capitalize",
                color: "#000",
                border: "1px solid #707070",
                "&:hover": {
                  backgroundColor: "#000",
                  color: "#FFF",
                },
              }}
            >
              <GoogleIcon
                sx={{ mr: 2, color: "#FFAA33	", backgroundColor: "#FFF	" }}
              />{" "}
              {"login with google"}
            </Button>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs>
                <Link href="#" variant="body2" color="#000">
                  {" Forgot password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2" color="#000">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={openErrorAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={errorAlert ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {errorAlert}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openSuccessAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={"success"}
            sx={{ width: "100%" }}
          >
            {successAlert}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

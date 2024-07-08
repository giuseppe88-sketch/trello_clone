/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Snackbar, Alert, Divider } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./AuthForm.scss";
import GoogleIcon from "@mui/icons-material/Google";
import { useTranslation } from "react-i18next";
export interface AuthFormProps {
  type: "login" | "register";
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email?: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  openAlert: boolean;
  alert: string | null;
  setOpenSuccessAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenErrorAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessAlert?: React.Dispatch<React.SetStateAction<string>>;
  setAlert?: React.Dispatch<React.SetStateAction<string>>;
  isError: boolean | null;
  handleSubmit: (event: any) => Promise<void>;
  handleClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}
function AuthForm({
  type,
  username,
  setUsername,
  password,
  setPassword,
  email,
  setEmail,
  isError,
  openAlert,
  alert,
  handleSubmit,
  handleClose,
}: AuthFormProps) {
  const { t } = useTranslation(["AuthFormText"]); // load multiple namespaces

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
            height: type === "login" ? "680px" : "780px",
            backgroundColor: type === "register" ? "#EFEFEF		" : null,
          }}
        >
          <>
            <Avatar sx={{ m: 1, mt: 6, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {type === "login" ? t("signIn") : t("signUp")}
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
            {type === "register" && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
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
                p: 1.5,
                backgroundColor: "#004687",
                "&:hover": {
                  backgroundColor: "#B0C4DE",
                  color: "#000",
                },
              }}
            >
              {type === "login" ? t("signIn") : t("signUp")}
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
                p: 1.5,

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
              {type === "login"
                ? t("loginGoogleButton")
                : t("signupGoogleButton")}
            </Button>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs>
                <Link href="#" variant="body2" color="#000">
                  {t("textResetLink")}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href={type === "login" ? "/register" : "/login"}
                  variant="body2"
                  color="#000"
                >
                  {type === "login" ? t("linkTextSignup") : t("linkTextLogin")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={isError ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {alert}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
export default AuthForm;

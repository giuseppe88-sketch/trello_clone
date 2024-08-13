/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext } from "react";
import "./LoginPage.scss";
import { AuthFormProps } from "../Component/AuthForm";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";
import AuthForm from "../Component/AuthForm";
import { startTransition } from "react";

export default function LoginPage() {
  const { loginRequest } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openAlert, setOpenAlert] = useState<boolean>(false); // State to control Snackbar
  const [alert, setAlert] = useState<string | null>(null);
  const [isError, setError] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    startTransition(() => {
      loginRequest(username, password)
        .then((result: any) => {
          if (!result.user) {
            console.error(result.message);
            setError(true); // Open the Snackbar on error
            setAlert(result.message);
            setOpenAlert(true); // Open the Snackbar on error
            return;
          } else {
            setAlert("Successfully logged in");
            setError(false); // Close the Snackbar on success
            setOpenAlert(true); // Open the Snackbar on success
            setInterval(() => {
              navigate("/board");
            }, 1000);
            setUsername("");
            setPassword("");
          }
        })
        .catch((error: any) => console.log("error", error));
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false); // Close the Snackbar
  };

  const authFormProps: AuthFormProps = {
    type: "login",
    username,
    setUsername,
    password,
    setPassword,
    openAlert,
    alert,
    handleSubmit,
    handleClose,
    isError,
  };

  return (
    <div className="login-container">
      <AuthForm {...authFormProps} />
    </div>
  );
}

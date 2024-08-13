/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext } from "react";
import "./LoginPage.scss";
import { AuthFormProps } from "../Component/AuthForm";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";
import AuthForm from "../Component/AuthForm";

export default function LoginPage() {
  const { registerRequest } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>(""); // For Registration Form
  const [isError, setError] = useState<boolean | null>(null);
  const [openAlert, setOpenAlert] = useState<boolean>(false); // State to control Snackbar
  const [alert, setAlert] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await registerRequest(username, password, email)
      .then((result: any) => {
        if (result) {
          if (result["errors"]) {
            console.error(result["errors"]);
            Object.values(result).map((errors: any) => {
              errors.map((error: any) => {
                setAlert(error.msg);
                setError(true); // Open the Snackbar on error
                setOpenAlert(true); // Open the Snackbar on error
              });
            });
          } else {
            setAlert("Successfully registered, redirecting to login");
            setError(false);
            setOpenAlert(true); // Open the Snackbar on error
            setInterval(() => {
              navigate("/login");
            }, 2000);
            setUsername("");
            setPassword("");
          }
        } else {
          setError(true);
          console.error("Invalid request");
          setAlert("Invalid request/username already taken");
          setOpenAlert(true); // Open the Snackbar on error
        }
      })
      .catch((error: any) => console.error("error", error));
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      console.log(event)
      return;
    }
    setOpenAlert(false); // Close the Snackbar
  };

  const authFormProps: AuthFormProps = {
    type: "register",
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    openAlert,
    alert,
    handleSubmit,
    handleClose,
    isError,
  };

  return (
    <div className="register-container">
      <AuthForm {...authFormProps} />
    </div>
  );
}

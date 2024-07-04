import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function DashboardPage() {
  const { userToken, isAuthenticated } = useContext(AuthContext);

  return (
    <>{isAuthenticated ? <div>DashboardPage</div> : "USER NOT AUTHENTICATED"}</>
  );
}

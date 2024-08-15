import React, { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function DashboardPrivate({ children }) {
  const navigate = useNavigate();

  const localStorageToken = JSON.parse(localStorage.getItem("adminToken"));

  return (
    <>
      {localStorageToken ? (
        <>{children}</>
      ) : (
        Navigate({"to": "/"})
      )}
    </>
  );
}
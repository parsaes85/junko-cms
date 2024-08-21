import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function DashboardPrivate({ children }) {
  const userInfos = useSelector((state) => state.auth.userInfos);

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
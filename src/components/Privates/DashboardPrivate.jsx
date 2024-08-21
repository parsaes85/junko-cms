import React from "react";
import { useNavigate } from "react-router-dom";
import useGetMe from "../../hooks/useGetMe";

export default function DashboardPrivate({ children }) {
  const { data: getMe, isPending } = useGetMe(
    JSON.parse(localStorage.getItem("adminToken"))
  );
  
  const navigate = useNavigate()
  
  return (
    <>
      {!isPending && (getMe.length ? (
        <>{children}</>
      ) : (
        navigate("/")
      ))}
    </>
  );
}

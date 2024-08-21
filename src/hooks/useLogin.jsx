import React from "react";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { baseURL } from "../data/variables";
import { login } from "../Redux/store/authSlice";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) =>
      fetch(`${baseURL}/users?email=${data.email}`).then((res) => res.json()),
    onSuccess: (res, data) => {
      if (res[0].password === data.password) {
        if (res[0].role === "ADMIN") {
          localStorage.setItem("adminToken", JSON.stringify(res[0].token));
          dispatch(
            login({
              userInfos: res[0],
              isLoggedIn: true,
            })
          );
          Toast.fire({
            icon: "success",
            title: "ورود با موفقیت انجام شد",
          });
          navigate("/dashboard");
        } else {
          Toast.fire({
            icon: "error",
            title: "ایمیل یا رمز عبور اشتباه است!",
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: "ایمیل یا رمز عبور اشتباه است!",
        });
      }
    },
    onError: () => {
      Toast.fire({
        icon: "error",
        title: "ایمیل یا رمز عبور اشتباه است!",
      });
    },
  });
}

export default useLogin;

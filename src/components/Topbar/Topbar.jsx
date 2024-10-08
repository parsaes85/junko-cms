import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

import useGetMe from "../../hooks/useGetMe";
import { login } from "../../Redux/store/authSlice";

import "./Topbar.css";

export default function Topbar() {
  const userInfos = useSelector((state) => state.auth.userInfos);
  const { data: getMe } = useGetMe(
    JSON.parse(localStorage.getItem("adminToken"))
  );

  const [topbarTitle, setTopbarTitle] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const locationPathname = location.pathname.split("/")[1];

  useEffect(() => {
    switch (locationPathname) {
      case "dashboard": {
        setTopbarTitle("داشبورد");
        break;
      }
      case "users": {
        setTopbarTitle("کاربران");
        break;
      }
      case "products": {
        setTopbarTitle("محصولات");
        break;
      }
      case "messages": {
        setTopbarTitle("پیام ها");
        break;
      }
      case "blogs": {
        setTopbarTitle("بلاگ ها");
        break;
      }
      case "categories": {
        setTopbarTitle("دسته‌بندی ها");
        break;
      }
      default: {
        setTopbarTitle("");
        break;
      }
    }
  }, [locationPathname]);

  useEffect(() => {
    if (getMe?.length) {
      if (getMe[0].role == "ADMIN") {
        dispatch(
          login({
            userInfos: getMe[0],
            isLoggedIn: true,
          })
        );
      }
    }
  }, [getMe]);

  return (
    <header>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
          <h1 className="font-semibold text-xl xs:text-2xl capitalize mr-7 xs:mr-0">
            {topbarTitle}
          </h1>

          <div className="flex gap-1 xs:gap-3 items-center text-[9px] xs:text-[11px] font-semibold bg-white px-3 rounded-md">
            01.08.2023 - 30.08.2023
            <DateRangeOutlinedIcon
              fontSize="small"
              className="topbar-calender-icon"
            />
          </div>
        </div>

        <div className="mt-2 xs:mt-0">
          <div className="flex gap-1 xs:gap-2 items-center">
            <p className="font-semibold text-[10px] xs:text-xs">
              {userInfos?.fullname}
            </p>
            <img
              src="/images/profile.jpg"
              alt=""
              className="w-6 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

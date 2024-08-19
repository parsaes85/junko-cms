import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CloseIcon from "@mui/icons-material/Close";

import CustomModal from "../CustomModal/CustomModal";
import { logout } from "../../Redux/store/authSlice";

import "./Sidebar.css";

export default function Sidebar() {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [isShowCustomModal, setIsShowCustomModal] = useState(false);

  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("adminToken");
    logout();
  };

  useEffect(() => {
    const hideSidebar = (e) => {
      if (e.target.tagName === "ASIDE") {
        setIsShowSidebar(false);
      }
    };
    document.addEventListener("click", hideSidebar);

    return () => {
      document.removeEventListener("click", hideSidebar);
    };
  }, []);

  return (
    <>
      {isShowCustomModal && (
        <CustomModal
          type="delete"
          setIsShowCustomModal={setIsShowCustomModal}
          confirmHandler={logoutHandler}
        />
      )}
      <div
        className="absolute top-6 right-8 xs:hidden cursor-pointer"
        onClick={() => setIsShowSidebar(true)}
      >
        <GridViewRoundedIcon />
      </div>
      <aside
        className={`fixed xs:static xs:block bg-black bg-opacity-50 w-full xs:w-auto h-[100vh] ${
          isShowSidebar ? "left-0" : "-left-[900px]"
        } z-50 transition-all duration-200`}
      >
        <div className="pt-4 bg-white w-48 h-full">
          <div className="px-7 flex justify-between items-center">
            <h1 className="font-bold text-xl text-secondary">JUNKO</h1>
            <span
              className="xs:hidden cursor-pointer"
              onClick={() => setIsShowSidebar(false)}
            >
              <CloseIcon />
            </span>
          </div>

          <div className="mt-8 text-primary font-semibold text-sm">
            <ul className="pl-3 pr-8">
              <li>
                <NavLink
                  to="/dashboard"
                  className="flex gap-2 hover:text-slate-900 py-2 pl-4 pr-10 rounded-full"
                >
                  <AssessmentOutlinedIcon fontSize="small" />
                  داشبورد
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className="flex gap-2 hover:text-slate-900  py-2 pl-4 pr-10 rounded-full"
                >
                  <PersonOutlineOutlinedIcon fontSize="small" />
                  کاربران
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="flex gap-2 hover:text-slate-900 py-2 pl-4 pr-10 rounded-full"
                >
                  <ShoppingCartOutlinedIcon fontSize="small" />
                  محصولات
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className="flex gap-2 hover:text-slate-900 py-2 pl-4 pr-10 rounded-full"
                >
                  <DescriptionOutlinedIcon fontSize="small" />
                  بلاگ‌ ها
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/messages"
                  className="flex gap-2 hover:text-slate-900  py-2 pl-4 pr-10 rounded-full"
                >
                  <EmailOutlinedIcon fontSize="small" />
                  پیام ها
                </NavLink>
              </li>
            </ul>

            <hr className="my-3" />

            <ul className="pl-3 pr-8">
              <li>
                <Link className="flex gap-2 hover:text-slate-900  py-2 pl-4 pr-10 rounded-full">
                  <SettingsOutlinedIcon fontSize="small" />
                  تنظیمات
                </Link>
              </li>
              <li>
                <span
                  className="flex gap-2 hover:text-slate-900  py-2 pl-4 pr-10 rounded-full cursor-pointer"
                  onClick={() => setIsShowCustomModal(true)}
                >
                  <ExitToAppOutlinedIcon fontSize="small" />
                  خروج
                </span>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

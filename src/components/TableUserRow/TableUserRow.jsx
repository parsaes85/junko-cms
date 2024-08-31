import React, { useEffect, useState, useContext } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";

import ActionsMenu from "../../components/ActionsMenu/ActionsMenu";
import { setMainUserInfo } from "../../Redux/store/usersSlice";

export default function TableUserRow({ flag, setFlag, ...props }) {
  const dispatch = useDispatch();

  const [isShowActionsMenu, setIsShowActionsMenu] = useState(false);

  useEffect(() => {
    setIsShowActionsMenu(false);
  }, [flag]);

  return (
    <>
      <tr className="[&>*]:text-sm">
        <td className="rounded-r-2xl space-x-1 whitespace-nowrap">
          <AccountCircleIcon
            fontSize="small"
            className="text-primary mb-0.5 ml-2"
          />
          <span>{props.fullname}</span>
        </td>
        <td>{props.username}</td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
        <td>
          <span
            className={`rounded-full px-3 py-1 lowercase text-xs lg:text-sm ${
              props.role === "ADMIN"
                ? "bg-red-100 text-red-500"
                : "bg-sky-100 text-sky-500"
            }`}
          >
            {props.role === "ADMIN" ? "ادمین" : "کاربر"}
          </span>
        </td>
        <td className="rounded-l-2xl relative">
          <span
            onClick={() => {
              setIsShowActionsMenu(true);
              dispatch(setMainUserInfo(props));
            }}
            onMouseDown={() => setFlag((prevValue) => !prevValue)}
          >
            <MoreHorizIcon className="cursor-pointer" />
          </span>
          <ActionsMenu
            isShowActionsMenu={isShowActionsMenu}
            setIsShowActionsMenu={setIsShowActionsMenu}
            status="delete-user"
          />
        </td>
      </tr>
      <br />
    </>
  );
}

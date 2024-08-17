import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useDispatch } from "react-redux";

import ActionsMenu from "../../components/ActionsMenu/ActionsMenu";
import { setMainProductInfo } from "../../Redux/store/productsSlice";

export default function TableProductRow({ flag, setFlag, ...props }) {
  const dispatch = useDispatch();

  const [isShowActionsMenu, setIsShowActionsMenu] = useState(false);

  useEffect(() => {
    setIsShowActionsMenu(false);
  }, [flag]);

  return (
    <>
      <tr>
        <td className="rounded-r-2xl space-x-1 flex gap-2">
          <LocalMallIcon fontSize="small" className="text-primary mb-0.5" />
          <span className="w-72 line-clamp-1">{props.name}</span>
        </td>
        <td>{props.price.toLocaleString("fa")} تومان</td>
        <td>{props.discount.toLocaleString("fa")}%</td>
        <td>{props.count.toLocaleString("fa")}</td>
        <td>{props.category.title}</td>
        <td>
          <span
            className={`rounded-full px-2 py-1 lowercase ${
              props.isAvailable
                ? "bg-sky-100 text-sky-500"
                : "bg-red-100 text-red-500"
            } `}
          >
            {props.isAvailable ? "موجود" : "ناموجود"}
          </span>
        </td>
        <td className="rounded-l-2xl relative">
          <span
            onClick={() => {
              setIsShowActionsMenu(true);
              dispatch(setMainProductInfo(props));
            }}
            onMouseDown={() => setFlag((prevValue) => !prevValue)}
          >
            <MoreHorizIcon className="cursor-pointer" />
          </span>
          <ActionsMenu
            isShowActionsMenu={isShowActionsMenu}
            setIsShowActionsMenu={setIsShowActionsMenu}
            status="delete-product"
          />
        </td>
      </tr>
      <br />
    </>
  );
}

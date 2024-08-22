import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useDispatch } from "react-redux";

import ActionsMenu from "../../components/ActionsMenu/ActionsMenu";
import { setMainCategoryInfo } from "../../Redux/store/categoriesSlice";

function TableCategoryRow({ flag, setFlag, ...props }) {
  const dispatch = useDispatch();

  const [isShowActionsMenu, setIsShowActionsMenu] = useState(false);

  useEffect(() => {
    setIsShowActionsMenu(false);
  }, [flag]);

  return (
    <>
      <tr className="[&>*]:text-sm">
        <td className="rounded-r-2xl space-x-1 flex gap-2 py-4">
          <LocalMallIcon fontSize="small" className="text-primary mb-0.5" />
          <span className="w-72 line-clamp-1">{props.title}</span>
        </td>
        <td className="whitespace-nowrap">{props.name}</td>
        <td>{props.image}</td>
        <td className="rounded-l-2xl relative">
          <span
            onClick={() => {
              setIsShowActionsMenu(true);
              dispatch(setMainCategoryInfo(props));
            }}
            onMouseDown={() => setFlag((prevValue) => !prevValue)}
          >
            <MoreHorizIcon className="cursor-pointer" />
          </span>
          <ActionsMenu
            isShowActionsMenu={isShowActionsMenu}
            setIsShowActionsMenu={setIsShowActionsMenu}
            status="delete-category"
          />
        </td>
      </tr>
      <br />
    </>
  );
}

export default TableCategoryRow;

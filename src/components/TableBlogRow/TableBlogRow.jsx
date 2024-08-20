import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { useDispatch } from "react-redux";

import ActionsMenu from "../../components/ActionsMenu/ActionsMenu";
import { setMainBlogInfo } from "../../Redux/store/blogsSlice";
import BlogContentModal from "../BlogContentModal/BlogContentModal";

function TableBlogRow({ flag, setFlag, ...props }) {
  const dispatch = useDispatch();

  const [isShowActionsMenu, setIsShowActionsMenu] = useState(false);
  const [isShowBlogContentModal, setIsShowBlogContentModal] = useState(false);
  const [blogContentModalBody, setBlogContentModalBody] = useState("");

  useEffect(() => {
    setIsShowActionsMenu(false);
  }, [flag]);

  return (
    <>
      {isShowBlogContentModal && (
        <BlogContentModal
          body={blogContentModalBody}
          setIsShowBlogContentModal={setIsShowBlogContentModal}
        />
      )}
      <tr className="[&>*]:text-sm">
        <td className="rounded-r-2xl space-x-1 flex gap-2 py-4">
          <LibraryBooksOutlinedIcon
            fontSize="small"
            className="text-primary mb-0.5"
          />
          <span className="w-72 line-clamp-1">{props.title}</span>
        </td>
        <td className="">
          <span className="block whitespace-nowrap overflow-hidden text-ellipsis w-48">
            {props.shortName}
          </span>
        </td>
        <td className="whitespace-nowrap">{props.category.title}</td>
        <td>
          <button
            className="bg-primary px-3 rounded-full py-1"
            onClick={() => {
              setBlogContentModalBody(props.body);
              setIsShowBlogContentModal(true);
            }}
          >
            توضیخات
          </button>
        </td>
        <td>
          <button
            className="bg-primary px-3 rounded-full py-1"
            onClick={() => {
              setBlogContentModalBody(props.desc);
              setIsShowBlogContentModal(true);
            }}
          >
            محتوا
          </button>
        </td>
        <td>
          <span
            className={`rounded-full px-2 py-1 lowercase text-xs lg:text-sm whitespace-nowrap ${
              props.publish
                ? "bg-sky-100 text-sky-500"
                : "bg-red-100 text-red-500"
            } `}
          >
            {props.publish ? "منتشر شده" : "درحال پیش‌نویس"}
          </span>
        </td>
        <td className="rounded-l-2xl relative">
          <span
            onClick={() => {
              setIsShowActionsMenu(true);
              dispatch(setMainBlogInfo(props));
            }}
            onMouseDown={() => setFlag((prevValue) => !prevValue)}
          >
            <MoreHorizIcon className="cursor-pointer" />
          </span>
          <ActionsMenu
            isShowActionsMenu={isShowActionsMenu}
            setIsShowActionsMenu={setIsShowActionsMenu}
            status="delete-blog"
          />
        </td>
      </tr>
      <br />
    </>
  );
}

export default TableBlogRow;

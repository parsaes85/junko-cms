import React, { useState, useEffect, useContext } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

import ProductContext from "../../contexts/productContext";
import CustomModal from "../../components/CustomModal/CustomModal";
import EditUserModal from "../EditUserModal/EditUserModal";
import EditProductModal from "../EditProductModal/EditProductModal";
import useDeleteUser from "../../hooks/useDeleteUser";
import useDeleteProduct from "../../hooks/useDeleteProduct";

import "./ActionsMenu.css";

export default function ActionsMenu({
  isShowActionsMenu,
  setIsShowActionsMenu,
  status,
}) {
  const mainUserInfo = useSelector((state) => state.users.mainUserInfo);
  const mainProductInfo = useSelector((state) => state.products.mainProductInfo);
  const mainBlogInfo = useSelector((state) => state.blogs.mainBlogInfo);
  console.log(mainBlogInfo)

  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [isShowCustomModal, setIsShowCustomModal] = useState(false);
  const [isShowEditUserModal, setIsShowEditUserModal] = useState(false);
  const [isShowEditProductModal, setIsShowEditProductModal] = useState(false);

  useEffect(() => {
    const hideActionsMenu = (e) => {
      if (e.target.tagName !== "svg" && e.target.tagName !== "path") {
        setIsShowActionsMenu(false);
      }
    };
    document.addEventListener("click", hideActionsMenu);

    return () => {
      document.removeEventListener("click", hideActionsMenu);
    };
  }, []);

  const showEditModalHandler = () => {
    if (status === "delete-user") {
      setIsShowEditUserModal(true);
    } else {
      setIsShowEditProductModal(true);
    }
  };

  return (
    <>
      {isShowCustomModal && (
        <>
          {status === "delete-user" ? (
            <CustomModal
              type="delete"
              setIsShowCustomModal={setIsShowCustomModal}
              confirmHandler={() => deleteUser(mainUserInfo.id)}
            />
          ) : (
            <CustomModal
              type="delete"
              setIsShowCustomModal={setIsShowCustomModal}
              confirmHandler={() => deleteProduct(mainProductInfo.id)}
            />
          )}
        </>
      )}

      {isShowEditUserModal && (
        <EditUserModal setIsShowEditUserModal={setIsShowEditUserModal} />
      )}
      {isShowEditProductModal && (
        <EditProductModal
          setIsShowEditProductModal={setIsShowEditProductModal}
        />
      )}

      <div
        className={`absolute bg-white left-5 px-2 py-3 space-y-2 rounded-lg text-xs w-28 shadow-md z-50 ${
          !isShowActionsMenu && "hidden"
        }`}
      >
        <div
          className="bg-sky-50 text-sky-800 px-2 py-1 flex gap-1 items-center rounded-md cursor-pointer"
          onClick={() => {
            showEditModalHandler();
          }}
        >
          <BorderColorIcon fontSize="small" className="actions-icon" /> ویرایش
        </div>
        <div
          className="bg-red-50 text-red-800 px-2 py-1 flex gap-1 items-center rounded-md cursor-pointer"
          onClick={() => setIsShowCustomModal(true)}
        >
          <DeleteIcon fontSize="small" className="actions-icon" /> حذف
        </div>
      </div>
    </>
  );
}

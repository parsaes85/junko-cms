import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Input from "../Input/Input";
import useEditCategory from "../../hooks/useEditCategory";

function EditCategoryModal({ setIsShowEditCategoryModal }) {
  const { mutate: editCategory } = useEditCategory();

  const mainCategoryInfo = useSelector(
    (state) => state.categories.mainCategoryInfo
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    editCategory({
      categoryId: mainCategoryInfo.id,
      newCategoryInfos: {
        title: data.title,
        name: data.name,
        image: data.imageLink,
      },
    });
    setIsShowEditCategoryModal(false);
  };

  function setInputsValuesInEditModal() {
    setValue("title", mainCategoryInfo.title);
    setValue("name", mainCategoryInfo.name);
    setValue("imageLink", mainCategoryInfo.image);
  }

  useEffect(() => {
    setInputsValuesInEditModal();

    const hideEditModal = (e) => {
      if (e.target.id === "edit-modal-parent") {
        setIsShowEditCategoryModal(false);
      }
    };
    document.addEventListener("click", hideEditModal);

    return () => {
      document.removeEventListener("click", hideEditModal);
    };
  }, []);

  return (
    <div
      id="edit-modal-parent"
      className="fixed top-0 left-0 bg-black bg-opacity-30 h-[100vh] w-full z-50 flex items-center justify-center"
    >
      <div className="bg-white w-1/2 rounded-2xl py-6 px-4 overflow-auto max-h-[95vh]">
        <div className="rounded-2xl">
          <h1 className="font-semibold text-xl">ویرایش دسته‌بندی</h1>

          <form
            className="mt-6 grid lg:grid-cols-2 gap-y-6 gap-x-16"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="title-input"
                className="text-xs font-semibold text-primary"
              >
                عنوان
              </label>
              <Input
                type="text"
                id="title-input"
                register={{
                  ...register("title", { required: true, minLength: 2 }),
                }}
                validations={[
                  errors.title?.type === "required" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      title is required
                    </p>
                  ),
                  errors.title?.type === "minLength" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      title must be at least 2 character
                    </p>
                  ),
                ]}
              />
            </div>
            <div>
              <label
                htmlFor="name-input"
                className="text-xs font-semibold text-primary"
              >
                نام
              </label>
              <Input
                type="text"
                id="name-input"
                register={{
                  ...register("name", { required: true, minLength: 2 }),
                }}
                validations={[
                  errors.name?.type === "required" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      name is required
                    </p>
                  ),
                  errors.name?.type === "minLength" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      name must be at least 2 character
                    </p>
                  ),
                ]}
              />
            </div>
            <div>
              <label
                htmlFor="imageLink-input"
                className="text-xs font-semibold text-primary"
              >
                لینک عکس دسته‌بندی
              </label>
              <Input
                type="text"
                id="imageLink-input"
                register={{
                  ...register("imageLink", { required: true, minLength: 2 }),
                }}
                validations={[
                  errors.imageLink?.type === "required" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      imageLink is required
                    </p>
                  ),
                  errors.imageLink?.type === "minLength" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      imageLink must be at least 2 character
                    </p>
                  ),
                ]}
              />
            </div>
            <div className="mt-auto">
              <button className="bg-sky-700 text-gray-200 rounded-full px-6 py-2 text-sm hover:bg-sky-800 transition">
                ویرایش
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCategoryModal;

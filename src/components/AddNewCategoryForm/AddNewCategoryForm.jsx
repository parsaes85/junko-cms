import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../components/Input/Input";
import CustomModal from "../CustomModal/CustomModal";
import useAddNewCategory from "../../hooks/useAddNewCategory";

function AddNewCategoryForm() {
  const { mutate: addNewCategory } = useAddNewCategory();
  
  const [isShowCustomModal, setIsShowCustomModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const emptyInputsValue = () => {
    setValue("title", "");
    setValue("name", "");
    setValue("imageLink", "");
  };

  const onSubmit = (data) => {
    addNewCategory({
        title: data.title,
        name: data.name,
        image: data.imageLink
    })
    setIsShowCustomModal(true);
    emptyInputsValue();
  };

  return (
    <>
      {isShowCustomModal && (
        <CustomModal
          type="success"
          title="دسته‌بندی"
          setIsShowCustomModal={setIsShowCustomModal}
        />
      )}
      <div className="border border-gray-300 rounded-xl p-6 mt-10 mb-16">
        <h1 className="font-semibold">افزودن دسته‌بندی جدید</h1>

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
                ...register("title", { required: true }),
              }}
              validations={[
                errors.title?.type === "required" && (
                  <p role="alert" className="text-xs text-red-600 mt-1">
                    عنوان اجباری است
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
                ...register("name", { required: true }),
              }}
              validations={[
                errors.name?.type === "required" && (
                  <p role="alert" className="text-xs text-red-600 mt-1">
                    نام اجباری است
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
                ...register("imageLink", { required: true }),
              }}
              validations={[
                errors.imageLink?.type === "required" && (
                  <p role="alert" className="text-xs text-red-600 mt-1">
                    لینک عکس دسته‌بندی اجباری است
                  </p>
                ),
              ]}
            />
          </div>
          <div className="mt-auto">
            <button className="bg-sky-700 text-gray-200 rounded-full px-6 py-2 text-sm hover:bg-sky-800 transition">
              ثبت
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewCategoryForm;

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../components/Input/Input";
import CustomModal from "../CustomModal/CustomModal";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import Ckeditor from "../Ckeditor/Ckeditor";
import useAddNewBlog from "../../hooks/useAddNewBlog";

function AddNewBlogForm() {
  const { data: categories } = useGetAllCategories();
  const { mutate: addNewBlog } = useAddNewBlog();

  const [isShowCustomModal, setIsShowCustomModal] = useState(false);
  const [blogCategory, setBlogCategory] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [isBlogPublish, setIsBlogPublish] = useState(1);

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
    setBlogDesc("");
    setBlogBody("");
    setBlogCategory("");
    setIsBlogPublish(1);
  };

  const onSubmit = (data) => {
    const blogInfo = {
      title: data.title,
      desc: blogDesc,
      body: blogBody,
      cover: data.imageLink,
      shortName: data.name,
      creator: "3",
      categoryId: blogCategory,
      publish: isBlogPublish,
    };
    addNewBlog(blogInfo);
    setIsShowCustomModal(true);
    emptyInputsValue();
  };

  return (
    <>
      {isShowCustomModal && (
        <CustomModal
          type="success"
          title="بلاگ"
          setIsShowCustomModal={setIsShowCustomModal}
        />
      )}
      <div className="border border-gray-300 rounded-xl p-6 mt-10 mb-16">
        <h1 className="font-semibold">افزودن بلاگ جدید</h1>

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
              لینک عکس بلاک
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
                    لینک عکس بلاگ اجباری است
                  </p>
                ),
              ]}
            />
          </div>
          <div>
            <label htmlFor="" className="text-xs font-semibold text-primary">
              دسته‌بندی
            </label>
            <div>
              <select
                name=""
                id=""
                className="block w-full py-1 border-b rounded bg-transparent text-gray-800 border-gray-700 focus:outline-none"
                onChange={(event) => setBlogCategory(event.target.value)}
              >
                <option value="" selected={!blogCategory}>
                  انتخاب دسته‌بندی
                </option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="lg:col-span-2" id="blog-desc-ck">
            <label
              htmlFor="desc-textarea"
              className="text-xs font-semibold text-primary"
            >
              توضیحات
            </label>
            <textarea
              name=""
              id="desc-textarea"
              className="block w-full py-1 border-b rounded bg-transparent text-gray-800 border-gray-700 focus:outline-none resize-none"
              rows="4"
              onChange={(e) => setBlogDesc(e.target.value)}
              value={blogDesc}
            ></textarea>
          </div>
          <div className="lg:col-span-2" id="blog-body-ck">
            <label className="text-xs font-semibold text-primary">محتوا</label>
            <Ckeditor setDesc={setBlogBody} defaultText="" />
          </div>
          <div>
            <label htmlFor="" className="text-xs font-semibold text-primary">
              وضعیت
            </label>
            <div
              className="flex gap-3"
              onChange={(event) => setIsBlogPublish(Number(event.target.value))}
            >
              <div className="flex items-center gap-0.5">
                <label htmlFor="available">منتشر شده</label>
                <input
                  type="radio"
                  name="isBlogPublish"
                  id="available"
                  value={1}
                  defaultChecked
                />
              </div>
              <div className="flex items-center gap-0.5">
                <label htmlFor="not-available">درحال پیش‌نویس</label>
                <input
                  type="radio"
                  name="isBlogPublish"
                  id="not-available"
                  value={0}
                />
              </div>
            </div>
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

export default AddNewBlogForm;

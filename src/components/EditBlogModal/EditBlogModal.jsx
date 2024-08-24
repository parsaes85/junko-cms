import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Input from "../Input/Input";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import Ckeditor from "../Ckeditor/Ckeditor";
import useEditBlog from "../../hooks/useEditBlog";

function EditBlogModal({ setIsShowEditBlogModal }) {
  const { data: categories } = useGetAllCategories();
  const { mutate: editBlog } = useEditBlog();

  const mainBlogInfo = useSelector((state) => state.blogs.mainBlogInfo);

  const [blogCategory, setBlogCategory] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [isBlogPublish, setIsBlogPublish] = useState(mainBlogInfo.publish);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setInputsValuesInEditModal();

    const hideEditModal = (e) => {
      if (e.target.id === "edit-modal-parent") {
        setIsShowEditBlogModal(false);
      }
    };
    document.addEventListener("click", hideEditModal);

    return () => {
      document.removeEventListener("click", hideEditModal);
    };
  }, []);

  const onSubmit = (data) => {
    editBlog({
      blogId: mainBlogInfo.id,
      newBlogInfos: {
        title: data.title,
        desc: blogDesc,
        body: blogBody,
        cover: data.imageLink,
        shortName: data.name,
        creator: "3",
        categoryId: blogCategory,
        publish: isBlogPublish,
      },
    });
    setIsShowEditBlogModal(false);
  };

  function setInputsValuesInEditModal() {
    setValue("title", mainBlogInfo.title);
    setValue("name", mainBlogInfo.shortName);
    setValue("imageLink", mainBlogInfo.cover);
    setBlogCategory(mainBlogInfo.categoryId);
    setBlogDesc(mainBlogInfo.desc);
  }

  return (
    <div
      id="edit-modal-parent"
      className="fixed top-0 left-0 bg-black bg-opacity-30 h-[100vh] w-full z-50 flex items-center justify-center"
    >
      <div className="bg-white w-1/2 rounded-2xl py-6 px-4 overflow-auto h-[95vh]">
        <div className="rounded-2xl">
          <h1 className="font-semibold text-xl">ویرایش بلاگ</h1>

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
                    <option
                      key={category.id}
                      value={category.id}
                      selected={category.id == blogCategory}
                    >
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
              <label className="text-xs font-semibold text-primary">
                محتوا
              </label>
              <Ckeditor setDesc={setBlogBody} defaultText={mainBlogInfo.body} />
            </div>
            <div>
              <label htmlFor="" className="text-xs font-semibold text-primary">
                وضعیت
              </label>
              <div
                className="flex gap-3"
                onChange={(event) =>
                  setIsBlogPublish(Number(event.target.value))
                }
              >
                <div className="flex items-center gap-0.5">
                  <label htmlFor="publish">منتشر شده</label>
                  <input
                    type="radio"
                    name="isBlogPublish"
                    id="publish"
                    value={1}
                    defaultChecked={isBlogPublish}
                  />
                </div>
                <div className="flex items-center gap-0.5">
                  <label htmlFor="not-publish">درحال پیش‌نویس</label>
                  <input
                    type="radio"
                    name="isBlogPublish"
                    id="not-publish"
                    value={0}
                    defaultChecked={!isBlogPublish}
                  />
                </div>
              </div>
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

export default EditBlogModal;

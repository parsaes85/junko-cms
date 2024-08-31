import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Input from "../Input/Input";
import useEditUser from "../../hooks/useEditUser";

export default function EditUserModal({ setIsShowEditUserModal }) {
  const mainUserInfo = useSelector((state) => state.users.mainUserInfo);
  const { mutate: editUser } = useEditUser();

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
        setIsShowEditUserModal(false);
      }
    };
    document.addEventListener("click", hideEditModal);

    return () => {
      document.removeEventListener("click", hideEditModal);
    };
  }, []);

  const onSubmit = (data) => {
    editUser({
      newUserInfos: {
        id: mainUserInfo.id,
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: mainUserInfo.role,
        profile: mainUserInfo.profile,
        token: mainUserInfo.token,
      },
      userId: mainUserInfo.id,
    });
    setIsShowEditUserModal(false);
  };

  function setInputsValuesInEditModal() {
    setValue("fullname", mainUserInfo?.fullname);
    setValue("username", mainUserInfo?.username);
    setValue("email", mainUserInfo?.email);
    setValue("password", mainUserInfo?.password);
    setValue("phone", mainUserInfo?.phone);
  }

  return (
    <div
      id="edit-modal-parent"
      className="fixed top-0 left-0 bg-black bg-opacity-30 h-[100vh] w-full z-50 flex items-center justify-center"
    >
      <div className="bg-white w-11/12 md:w-1/2 rounded-2xl py-6 px-4 overflow-auto max-h-[95vh]">
        <div className="rounded-2xl">
          <h1 className="font-semibold text-xl">ویرایش کاربر</h1>

          <form
            className="mt-6 grid lg:grid-cols-2 gap-y-6 gap-x-16"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name-input"
                className="text-xs font-semibold text-primary"
              >
                نام و نام خانوادگی
              </label>
              <Input
                type="text"
                id="name-input"
                register={{
                  ...register("fullname", { required: true, minLength: 6 }),
                }}
                validations={[
                  errors.fullname?.type === "required" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      نام و نام خانوادگی اجباری است
                    </p>
                  ),
                  errors.fullname?.type === "minLength" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      نام و نام خانوادگی حداقل باید ۶ کاراکتر باشد
                    </p>
                  ),
                ]}
              />
            </div>
            <div>
              <label
                htmlFor="username-input"
                className="text-xs font-semibold text-primary"
              >
                نام کاربری
              </label>
              <Input
                type="text"
                id="username-input"
                register={{
                  ...register("username", { required: true, minLength: 8 }),
                }}
                validations={[
                  errors.username?.type === "required" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      نام کاربری اجباری است
                    </p>
                  ),
                  errors.username?.type === "minLength" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      نام کاربری حداقل باید ۸ کاراکتر باشد
                    </p>
                  ),
                ]}
              />
            </div>
            <div>
              <label
                htmlFor="email-input"
                className="text-xs font-semibold text-primary"
              >
                ایمیل
              </label>
              <Input
                type="email"
                id="email-input"
                register={{
                  ...register("email", { required: true }),
                }}
                validations={[
                  errors.email?.type === "required" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      ایمیل اجباری است
                    </p>
                  ),
                ]}
              />
            </div>
            <div>
              <label
                htmlFor="password-input"
                className="text-xs font-semibold text-primary"
              >
                رمز عبور
              </label>
              <Input
                type="text"
                id="password-input"
                register={{
                  ...register("password", { required: true, minLength: 8 }),
                }}
                validations={[
                  errors.password?.type === "required" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      رمز عبور اجباری است
                    </p>
                  ),
                  errors.password?.type === "minLength" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      رمز عبور حداقل باید ۸ کاراکتر باشد
                    </p>
                  ),
                ]}
              />
            </div>
            <div>
              <label
                htmlFor="phone-number-input"
                className="text-xs font-semibold text-primary"
              >
                شماره تلفن
              </label>
              <Input
                type="text"
                id="phone-number-input"
                register={{
                  ...register("phone", { required: true, minLength: 10 }),
                }}
                validations={[
                  errors.phone?.type === "required" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      شماره تلفن اجباری است
                    </p>
                  ),
                  errors.phone?.type === "minLength" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      شماره تلفن حداقل باید ۱۰ کاراکتر باشد
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

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../components/Input/Input";
import CustomModal from "../CustomModal/CustomModal";
import useAddNewUser from "../../hooks/useAddNewUser";

export default function AddNewUserForm() {
  const { mutate: addNewUser } = useAddNewUser();

  const [isShowCustomModal, setIsShowCustomModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const emptyInputsValue = () => {
    setValue("fullname", "");
    setValue("username", "");
    setValue("email", "");
    setValue("password", "");
    setValue("phone", "");
  };

  const onSubmit = (data) => {
    addNewUser({
      ...data,
      role: "USER",
      profile: "",
      token: crypto.randomUUID(),
    });
    setIsShowCustomModal(true);
    emptyInputsValue();
  };

  return (
    <>
      {isShowCustomModal && (
        <CustomModal
          type="success"
          title="کاربر"
          setIsShowCustomModal={setIsShowCustomModal}
        />
      )}
      <div className="border border-gray-300 rounded-xl p-6 mt-10 mb-16">
        <h1 className="font-semibold">افزودن کاربر جدید</h1>

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
              type="number"
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
              ثبت
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

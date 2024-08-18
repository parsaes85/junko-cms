import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../components/Input/Input";
import CustomModal from "../CustomModal/CustomModal";
import useAddNewProduct from "../../hooks/useAddNewProduct";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import Ckeditor from "../Ckeditor/Ckeditor";
import ProductColorPicker from "../ProductColorPicker/ProductColorPicker";

export default function AddNewProductForm() {
  const { data: categories } = useGetAllCategories();
  const { mutate: addNewProduct } = useAddNewProduct();

  const [isShowCustomModal, setIsShowCustomModal] = useState(false);
  const [isProductAvailable, setIsProductAvailable] = useState(1);
  const [productScore, setProductScore] = useState(5);
  const [productCategory, setProductCategory] = useState("");
  const [productShortDesc, setProductShortDesc] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productColors, setProductColors] = useState([]);
  const [isSpecialProduct, setIsSpecialProduct] = useState(0);
  const [isSpecialOffer, setIsSpecialOffer] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const emptyInputsValue = () => {
    setValue("name", "");
    setValue("price", "");
    setValue("count", "");
  };

  const onSubmit = (data) => {
    const productInfos = {
      name: data.name,
      shortDesc: productShortDesc,
      desc: productDesc,
      images: [data.imageLink],
      categoryId: productCategory,
      price: Number(data.price),
      colors: productColors,
      discount: Number(data.discount),
      score: productScore,
      count: Number(data.count),
      isAvailable: isProductAvailable,
      isSpecialProduct,
      isSpecialOffer,
    };
    console.log(productInfos);
    // addNewProduct({ ...data, isAvailable });
    // setIsShowCustomModal(true);
    // emptyInputsValue();
  };

  return (
    <>
      {isShowCustomModal && (
        <CustomModal
          type="success"
          title="Product"
          setIsShowCustomModal={setIsShowCustomModal}
        />
      )}
      <div className="border border-gray-300 rounded-xl p-6 mt-10 mb-16">
        <h1 className="font-semibold">افزودن محصول جدید</h1>

        <form
          className="mt-6 grid lg:grid-cols-2 gap-y-6 gap-x-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="name-input"
              className="text-xs font-semibold text-primary"
            >
              عنوان
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
              htmlFor="username-input"
              className="text-xs font-semibold text-primary"
            >
              قیمت
            </label>
            <Input
              type="number"
              id="price-input"
              register={{
                ...register("price", { required: true }),
              }}
              validations={[
                errors.price?.type === "required" && (
                  <p role="alert" className="text-xs text-red-600 mt-1">
                    Price is required
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
              تعداد
            </label>
            <Input
              type="number"
              id="count-input"
              register={{
                ...register("count", { required: true }),
              }}
              validations={[
                errors.count?.type === "required" && (
                  <p role="alert" className="text-xs text-red-600 mt-1">
                    Count is required
                  </p>
                ),
              ]}
            />
          </div>
          <div>
            <label
              htmlFor="discount-input"
              className="text-xs font-semibold text-primary"
            >
              تخفیف
            </label>
            <Input
              type="number"
              id="discount-input"
              register={{
                ...register("discount", { required: true, maxLength: 3 }),
              }}
              validations={[
                errors.discount?.type === "required" && (
                  <p role="alert" className="text-xs text-red-600 mt-1">
                    discount is required
                  </p>
                ),
                errors.discount?.type === "maxLength" && (
                  <p role="alert" className="text-xs text-red-600 mt-1">
                    discount is maxLength
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
              لینک عکس محصول
            </label>
            <Input
              type="count"
              id="imageLink-input"
              register={{
                ...register("imageLink", { required: true }),
              }}
              validations={[
                errors.imageLink?.type === "required" && (
                  <p role="alert" className="text-xs text-red-600 mt-1">
                    imageLink is required
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
              دسته‌بندی
            </label>
            <div>
              <select
                name=""
                id=""
                className="block w-full py-1 border-b rounded bg-transparent text-gray-800 border-gray-700 focus:outline-none"
                onChange={(event) => setProductCategory(event.target.value)}
              >
                <option value="">انتخاب دسته‌بندی</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="email-input"
              className="text-xs font-semibold text-primary"
            >
              امتیاز
            </label>
            <div>
              <select
                name=""
                id=""
                className="block w-full py-1 border-b rounded bg-transparent text-gray-800 border-gray-700 focus:outline-none"
                onChange={(event) =>
                  setProductScore(Number(event.target.value))
                }
              >
                <option value="5">خیلی خوب</option>
                <option value="4">خوب</option>
                <option value="3">متوسط</option>
                <option value="2">بد</option>
                <option value="1">خیلی بد</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-primary">
              رنگ محصول
            </label>
            <ProductColorPicker
              colorList={productColors}
              setColorList={setProductColors}
            />
          </div>
          <div className="col-span-2" id="product-shortDesc-ck">
            <label className="text-xs font-semibold text-primary">
              توضیحات کوتاه
            </label>
            <Ckeditor
              setProductDesc={setProductShortDesc}
              defaultText="<p>توضیحات کوتاه محصول را بنویسید</p>"
            />
          </div>
          <div className="col-span-2" id="product-desc-ck">
            <label className="text-xs font-semibold text-primary">
              توضیحات
            </label>
            <Ckeditor
              setProductDesc={setProductDesc}
              defaultText="<p>توضیحات محصول را بنویسید</p>"
            />
          </div>
          <div>
            <label
              htmlFor="phone-number-input"
              className="text-xs font-semibold text-primary"
            >
              موجودی
            </label>
            <div
              className="flex gap-3"
              onChange={(event) =>
                setIsProductAvailable(Number(event.target.value))
              }
            >
              <div className="flex items-center gap-0.5">
                <label htmlFor="available">موجود</label>
                <input
                  type="radio"
                  name="isProductAvailable"
                  id="available"
                  value={1}
                  defaultChecked
                />
              </div>
              <div className="flex items-center gap-0.5">
                <label htmlFor="not-available">ناموجود</label>
                <input
                  type="radio"
                  name="isProductAvailable"
                  id="not-available"
                  value={0}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-primary">وضعیت</label>
            <div className="flex gap-4">
              <div className="flex gap-1">
                <label htmlFor="specialOffer">پیشنهاد های ویژه</label>
                <input
                  type="checkbox"
                  id="specialOffer"
                  onChange={(e) => setIsSpecialOffer(Number(e.target.checked))}
                />
              </div>
              <div className="flex gap-1">
                <label htmlFor="specialProduct">محصولات ویژه</label>
                <input
                  type="checkbox"
                  id="specialProduct"
                  onChange={(e) =>
                    setIsSpecialProduct(Number(e.target.checked))
                  }
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

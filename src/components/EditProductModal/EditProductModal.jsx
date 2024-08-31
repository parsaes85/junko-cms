import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Input from "../Input/Input";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import Ckeditor from "../Ckeditor/Ckeditor";
import ProductColorPicker from "../ProductColorPicker/ProductColorPicker";
import useEditProduct from "../../hooks/useEditProduct";

export default function EditProductModal({ setIsShowEditProductModal }) {
  const { data: categories } = useGetAllCategories();
  const { mutate: editProduct } = useEditProduct();

  const mainProductInfo = useSelector(
    (state) => state.products.mainProductInfo
  );

  const [isProductAvailable, setIsProductAvailable] = useState(
    mainProductInfo.isAvailable
  );
  const [productScore, setProductScore] = useState(5);
  const [productCategoryId, setProductCategoryId] = useState("");
  const [productCategory, setProductCategory] = useState({});
  const [productShortDesc, setProductShortDesc] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productColors, setProductColors] = useState([]);
  const [isSpecialProduct, setIsSpecialProduct] = useState(0);
  const [isSpecialOffer, setIsSpecialOffer] = useState(0);

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
        setIsShowEditProductModal(false);
      }
    };
    document.addEventListener("click", hideEditModal);

    return () => {
      document.removeEventListener("click", hideEditModal);
    };
  }, []);

  const onSubmit = (data) => {
    editProduct({
      productId: mainProductInfo.id,
      newProductInfos: {
        name: data.name,
        shortDesc: productShortDesc,
        desc: productDesc,
        images: [data.imageLink],
        categoryId: productCategoryId,
        price: Number(data.price),
        colors: productColors,
        discount: Number(data.discount),
        score: productScore,
        count: Number(data.count),
        isAvailable: isProductAvailable,
        isSpecialProduct,
        isSpecialOffer,
        category: productCategory,
      },
    });
    setIsShowEditProductModal(false);
  };

  function setInputsValuesInEditModal() {
    setValue("name", mainProductInfo.name);
    setValue("price", mainProductInfo.price);
    setValue("count", mainProductInfo.count);
    setValue("discount", mainProductInfo.discount);
    setValue("imageLink", mainProductInfo.images[0]);
    setProductCategoryId(mainProductInfo.categoryId);
    setProductCategory(mainProductInfo.category);
    setProductScore(mainProductInfo.score);
    setProductColors(mainProductInfo.colors);
    setIsSpecialOffer(mainProductInfo.isSpecialOffer);
    setIsSpecialProduct(mainProductInfo.isSpecialProduct);
  }

  return (
    <div
      id="edit-modal-parent"
      className="fixed top-0 left-0 bg-black bg-opacity-30 h-[100vh] w-full z-50 flex items-center justify-center"
    >
      <div className="bg-white w-1/2 rounded-2xl py-6 px-4 overflow-auto h-[95vh]">
        <div className="rounded-2xl">
          <h1 className="font-semibold text-xl">ویرایش محصول</h1>

          <form
            className="mt-6 grid lg:grid-cols-2 gap-y-6 gap-x-16"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  ...register("name", { required: true, minLength: 3 }),
                }}
                validations={[
                  errors.name?.type === "required" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      نام اجباری است
                    </p>
                  ),
                  errors.name?.type === "minLength" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      نام حداقل باید ۳ کارکتر باشد
                    </p>
                  ),
                ]}
              />
            </div>
            <div>
              <label
                htmlFor="price-input"
                className="text-xs font-semibold text-primary"
              >
                قیمت
              </label>
              <Input
                type="number"
                id="price-input"
                register={{
                  ...register("price", { required: true, minLength: 4 }),
                }}
                validations={[
                  errors.price?.type === "required" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      قیمت اجباری است
                    </p>
                  ),
                  errors.price?.type === "minLength" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      قیمت حداقل باید ۴ کارکتر باشد
                    </p>
                  ),
                ]}
              />
            </div>
            <div>
              <label
                htmlFor="count-input"
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
                      تعداد اجباری است
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
                      تخفیف اجباری است
                    </p>
                  ),
                  errors.discount?.type === "maxLength" && (
                    <p role="alert" className="text-xs text-red-600 mt-1">
                      تخفیف نمی‌تواند بیشتر از ۴ کاراکتر باشد{" "}
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
                      لینک عکس محصول اجباری است
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
                  onChange={(event) => {
                    setProductCategoryId(JSON.parse(event.target.value).id);
                    setProductCategory(JSON.parse(event.target.value));
                  }}
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  {categories?.map((category) => (
                    <option
                      key={category.id}
                      value={JSON.stringify(category)}
                      selected={category.id == productCategoryId}
                    >
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
                  <option value="5" selected={productScore == 5}>
                    خیلی خوب
                  </option>
                  <option value="4" selected={productScore == 4}>
                    خوب
                  </option>
                  <option value="3" selected={productScore == 3}>
                    متوسط
                  </option>
                  <option value="2" selected={productScore == 2}>
                    بد
                  </option>
                  <option value="1" selected={productScore == 1}>
                    خیلی بد
                  </option>
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
            <div className="lg:col-span-2" id="product-shortDesc-ck">
              <label className="text-xs font-semibold text-primary">
                توضیحات کوتاه
              </label>
              <Ckeditor
                setProductDesc={setProductShortDesc}
                defaultText={mainProductInfo.shortDesc}
              />
            </div>
            <div className="lg:col-span-2" id="product-desc-ck">
              <label className="text-xs font-semibold text-primary">
                توضیحات
              </label>
              <Ckeditor
                setProductDesc={setProductDesc}
                defaultText={mainProductInfo.desc}
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
                    defaultChecked={isProductAvailable}
                  />
                </div>
                <div className="flex items-center gap-0.5">
                  <label htmlFor="not-available">ناموجود</label>
                  <input
                    type="radio"
                    name="isProductAvailable"
                    id="not-available"
                    value={0}
                    defaultChecked={!isProductAvailable}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-primary">
                وضعیت
              </label>
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <label htmlFor="specialOffer">پیشنهاد های ویژه</label>
                  <input
                    type="checkbox"
                    id="specialOffer"
                    checked={isSpecialOffer}
                    onChange={(e) =>
                      setIsSpecialOffer(Number(e.target.checked))
                    }
                  />
                </div>
                <div className="flex gap-1">
                  <label htmlFor="specialProduct">محصولات ویژه</label>
                  <input
                    type="checkbox"
                    id="specialProduct"
                    checked={isSpecialProduct}
                    onChange={(e) =>
                      setIsSpecialProduct(Number(e.target.checked))
                    }
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

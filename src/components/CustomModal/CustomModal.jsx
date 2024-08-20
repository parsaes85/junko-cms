import React, { useEffect } from "react";

export default function CustomModal({
  type,
  setIsShowCustomModal,
  confirmHandler,
  title,
}) {
  useEffect(() => {
    const hideCustomModal = (e) => {
      if (e.target.id === "custom-modal-parent") {
        setIsShowCustomModal(false);
      }
    };
    document.addEventListener("click", hideCustomModal);

    return () => {
      document.removeEventListener("click", hideCustomModal);
    };
  }, []);

  return (
    <div
      id="custom-modal-parent"
      className="fixed top-0 left-0 bg-black bg-opacity-30 h-[100vh] w-full z-[60] flex items-center justify-center"
    >
      <div className="bg-white w-72 py-6 text-center rounded-lg">
        {type === "delete" ? (
          <>
            <h1 className="font-semibold text-xl">آیا اطمینان دارید؟</h1>
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="bg-sky-700 text-gray-200 py-1 px-6 rounded-full"
                onClick={() => setIsShowCustomModal(false)}
              >
                خیر
              </button>
              <button
                className="bg-red-700 text-gray-200 py-1 px-6 rounded-full"
                onClick={() => {
                  setIsShowCustomModal(false);
                  confirmHandler();
                }}
              >
                بله
              </button>
            </div>
          </>
        ) : type === "success" ? (
          <>
            <h1 className="font-semibold text-xl">
              {title} با موفقیت اضافه شد
            </h1>
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="bg-sky-700 text-gray-200 py-1 px-6 rounded-full"
                onClick={() => setIsShowCustomModal(false)}
              >
                متوجه شدم
              </button>
            </div>
          </>
        ) : type === "error" ? (
          <>
            <h1 className="font-semibold text-xl">ادمین با این مشخصات پیدا نشد!</h1>
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="bg-red-700 text-gray-200 py-1 px-6 rounded-full"
                onClick={() => setIsShowCustomModal(false)}
              >
                تلاش مجدد
              </button>
            </div>
          </>
        ) : (
          <>
          <h1 className="font-semibold text-xl">
            {title}
          </h1>
          <div className="flex gap-4 justify-center mt-4">
            <button
              className="bg-sky-700 text-gray-200 py-1 px-6 rounded-full"
              onClick={() => setIsShowCustomModal(false)}
            >
              متوجه شدم
            </button>
          </div>
        </>
        )}
      </div>
    </div>
  );
}

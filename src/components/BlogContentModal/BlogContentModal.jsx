import React, { useEffect } from "react";

function BlogContentModal({ body, setIsShowBlogContentModal }) {
  useEffect(() => {
    const hideCustomModal = (e) => {
      if (e.target.id === "blog-content-modal-parent") {
        setIsShowBlogContentModal(false);
      }
    };
    document.addEventListener("click", hideCustomModal);

    return () => {
      document.removeEventListener("click", hideCustomModal);
    };
  }, []);

  return (
    <div
      id="blog-content-modal-parent"
      className="fixed top-0 left-0 bg-black bg-opacity-30 h-[100vh] w-full z-[60] flex items-center justify-center"
    >
      <div className="bg-white w-4/5 py-6 px-4 text-justify rounded-lg">
        <div dangerouslySetInnerHTML={{ __html: body }}></div>
        <div className="flex gap-4 justify-center mt-4">
          <button
            className="bg-sky-700 text-gray-200 py-1 px-6 rounded-full"
            onClick={() => setIsShowBlogContentModal(false)}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogContentModal;

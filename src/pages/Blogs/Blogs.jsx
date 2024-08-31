import React, { useState } from "react";

import DataTable from "../../components/DataTable/DataTable";
import AddNewBlogForm from "../../components/AddNewBlogForm/AddNewBlogForm";
import useGetBlogs from "../../hooks/useGetBlogs";
import TableBlogRow from "../../components/TableBlogRow/TableBlogRow";

function Blogs() {
  const { data: blogs } = useGetBlogs();

  const [flag, setFlag] = useState(false);

  return (
    <>
      <AddNewBlogForm />

      <div className="w-[700px] lg:w-full overflow-auto">
        <DataTable>
          <thead>
            <tr>
              <th>عنوان</th>
              <th>نام</th>
              <th>دسته‌بندی</th>
              <th>توضیحات</th>
              <th>محتوا</th>
              <th>وضعیت</th>
              <th>اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog) => (
              <TableBlogRow
                {...blog}
                key={blog.id}
                flag={flag}
                setFlag={setFlag}
              />
            ))}
          </tbody>
        </DataTable>
      </div>
    </>
  );
}

export default Blogs;

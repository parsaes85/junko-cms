import React, { useState } from "react";

import DataTable from "../../components/DataTable/DataTable";
import TableCategoryRow from "../../components/TableCategoryRow/TableCategoryRow";
import useGetAllCategories from "../../hooks/useGetAllCategories";
import AddNewCategoryForm from "../../components/AddNewCategoryForm/AddNewCategoryForm";

function Categories() {
  const { data: categories } = useGetAllCategories();

  const [flag, setFlag] = useState(false);

  return (
    <>
      <AddNewCategoryForm />

      <div className="w-[700px] lg:w-full">
        <DataTable>
          <thead>
            <tr>
              <th>عنوان</th>
              <th>نام</th>
              <th>لینک عکس</th>
              <th>اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <TableCategoryRow
                {...category}
                key={category.id}
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

export default Categories;

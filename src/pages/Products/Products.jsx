import React, { useState } from "react";

import DataTable from "../../components/DataTable/DataTable";
import TableProductRow from "../../components/TableProductRow/TableProductRow";
import AddNewProductForm from "../../components/AddNewProductForm/AddNewProductForm";
import useGetProducts from "../../hooks/useGetProducts";

export default function Products() {
  const { data: products } = useGetProducts();

  const [flag, setFlag] = useState(false);

  return (
    <>
      <AddNewProductForm />

      <div className="w-[700px] lg:w-full overflow-auto">
        <DataTable>
          <thead>
            <tr>
              <th>عنوان</th>
              <th>قیمت</th>
              <th>تخفیف</th>
              <th>تعداد</th>
              <th>دسته‌بندی</th>
              <th>موجودی</th>
              <th>اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <TableProductRow
                {...product}
                key={product.id}
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

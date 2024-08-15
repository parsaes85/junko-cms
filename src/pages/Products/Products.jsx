import React, { useEffect, useState } from "react";

import DataTable from "../../components/DataTable/DataTable";
import TableProductRow from "../../components/TableProductRow/TableProductRow";
import AddNewProductForm from "../../components/AddNewProductForm/AddNewProductForm";
import ProductContext from "../../contexts/productContext";
import useGetProducts from "../../hooks/useGetProducts";

export default function Products() {
  const mainUrl = "http://localhost:8000/api";
  const { data: products } = useGetProducts();

  const [flag, setFlag] = useState(false);
  const [mainProductInfo, setMainProductInfo] = useState({});

  return (
    <ProductContext.Provider
      value={{
        mainProductInfo,
        setMainProductInfo,
      }}
    >
      <AddNewProductForm />

      <div className="w-[700px] lg:w-full">
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
    </ProductContext.Provider>
  );
}

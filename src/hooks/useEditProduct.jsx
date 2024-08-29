import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../data/variables";

function useEditProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editProduct"],
    mutationFn: (data) =>
      fetch(`${baseURL}/products/${data.productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.newProductInfos),
      }),
    onSuccess: (res, data) => {
      queryClient.invalidateQueries();
    },
  });
}

export default useEditProduct;

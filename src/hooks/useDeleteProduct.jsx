import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { baseURL } from "../data/variables";

function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removeProduct"],
    mutationFn: (productId) =>
      fetch(`${baseURL}/products/${productId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export default useDeleteProduct;

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../data/variables";

function useAddNewProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addNewProduct"],
    mutationFn: (data) =>
      fetch(`${baseURL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export default useAddNewProduct;

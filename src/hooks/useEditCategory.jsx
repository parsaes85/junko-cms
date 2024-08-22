import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../data/variables";

function useEditCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editCategory"],
    mutationFn: (data) =>
      fetch(`${baseURL}/categories/${data.categoryId}`, {
        method: "PUT",
        "Content-Type": "application/json",
        body: JSON.stringify(data.newCategoryInfos),
      }),
    onSuccess: (res, data) => {
      queryClient.invalidateQueries();
    },
  });
}

export default useEditCategory;

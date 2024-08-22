import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { baseURL } from "../data/variables";

function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removeCategory"],
    mutationFn: (categoryId) =>
      fetch(`${baseURL}/categories/${categoryId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export default useDeleteCategory;

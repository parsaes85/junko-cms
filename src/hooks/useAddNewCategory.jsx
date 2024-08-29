import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../data/variables";

function useAddNewCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addNewCategory"],
    mutationFn: (data) =>
      fetch(`${baseURL}/categories`, {
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

export default useAddNewCategory;

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../data/variables";

function useAddNewBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addNewBlog"],
    mutationFn: (data) =>
      fetch(`${baseURL}/blogs`, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export default useAddNewBlog;

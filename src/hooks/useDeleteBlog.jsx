import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { baseURL } from "../data/variables";

function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removeBlog"],
    mutationFn: (blogId) =>
      fetch(`${baseURL}/blogs/${blogId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export default useDeleteBlog;

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../data/variables";

function useEditBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editBlog"],
    mutationFn: (data) =>
      fetch(`${baseURL}/blogs/${data.blogId}`, {
        method: "PUT",
        "Content-Type": "application/json",
        body: JSON.stringify(data.newBlogInfos),
      }),
    onSuccess: (res, data) => {
      queryClient.invalidateQueries();
    },
  });
}

export default useEditBlog;

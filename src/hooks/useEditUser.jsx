import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../data/variables";

function useEditUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editUser"],
    mutationFn: (data) =>
      fetch(`${baseURL}/users/${data.userId}`, {
        method: "PUT",
        "Content-Type": "application/json",
        body: JSON.stringify(data.newUserInfos),
      }),
    onSuccess: (res, data) => {
      queryClient.invalidateQueries();
    },
  });
}

export default useEditUser;

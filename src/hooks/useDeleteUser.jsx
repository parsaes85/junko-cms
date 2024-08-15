import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { baseURL } from "../data/variables";

function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["removeUser"],
    mutationFn: (userId) =>
      fetch(`${baseURL}/users/${userId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export default useDeleteUser;

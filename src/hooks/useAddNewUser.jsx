import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../data/variables";

function useAddNewUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addNewUser"],
    mutationFn: (data) =>
      fetch(`${baseURL}/users`, {
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

export default useAddNewUser;

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { baseURL } from "../data/variables";

function useGetUsers() {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: () => fetch(`${baseURL}/users`).then((res) => res.json()),
  });
}

export default useGetUsers;

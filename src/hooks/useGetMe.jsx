import React from "react";
import { useQuery } from "@tanstack/react-query";

import { baseURL } from "../data/variables";

function useGetMe(token) {
  return useQuery({
    queryKey: ["getMe"],
    queryFn: () =>
      fetch(`${baseURL}/users?token=${token}`).then((res) => res.json()),
  });
}

export default useGetMe;

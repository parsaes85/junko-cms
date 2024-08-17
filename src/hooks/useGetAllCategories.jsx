import React from "react";
import { useQuery } from "@tanstack/react-query";

import { baseURL } from "../data/variables";

function useGetAllCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch(`${baseURL}/categories`).then((res) => res.json()),
  });
}

export default useGetAllCategories;

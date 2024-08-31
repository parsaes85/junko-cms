import React from "react";
import { useQuery } from "@tanstack/react-query";

import { baseURL } from "../data/variables";

function useGetProducts() {
  return useQuery({
    queryKey: ["getProducts"],
    queryFn: () => fetch(`${baseURL}/products`).then((res) => res.json()),
  });
}

export default useGetProducts;

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { baseURL } from "../data/variables";

function useGetBlogs() {
  return useQuery({
    queryKey: ["getBlogs"],
    queryFn: () =>
      fetch(`${baseURL}/blogs?_embed=category`).then((res) => res.json()),
  });
}

export default useGetBlogs;

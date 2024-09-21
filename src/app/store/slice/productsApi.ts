import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./productsSlice";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], { limit: number; skip: number }>({
      query: ({ limit, skip }) =>
        `products?limit=${limit}&skip=${skip}&select=title,price,id,thumbnail`,
    }),
  }),
});

export const { useFetchProductsQuery } = productsApi;

export default productsApi.reducer;

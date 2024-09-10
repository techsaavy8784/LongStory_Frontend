import { useState, useEffect } from "react";
import Image from "next/image";

import { useAppSelector, useAppDispatch } from "@/types/hooks";
import { fetchProducts, setPage } from "@/redux/slices/product/productSlice";
import Product from "./product";
import Loading from "../loading";

export function Products() {
  const products = useAppSelector((state) => state.product.products);
  const category_id = useAppSelector((state) => state.product.category_id);
  const loading = useAppSelector((state) => state.product.loading);
  const page = useAppSelector((state) => state.product.page);
  const search = useAppSelector((state) => state.product.search);
  const hasNext = useAppSelector((state) => state.product.hasNext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasNext) {
      fetchProducts(page, category_id, search);
    }
  }, [page, category_id, hasNext, search]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [search, category_id]);

  return products && products.length === 0 && loading ? (
    <Loading />
  ) : products && products.length === 0 && !loading ? (
    <div>there are no products</div>
  ) : (
    <>
      <div className="flex flex-col">
        {products &&
          products.map((product, index) => (
            <Product
              product={product}
              key={index}
              isLast={index === products.length - 1}
              newLimit={() => {
                if (hasNext) {
                  dispatch(setPage(page + 1));
                }
              }}
            />
          ))}
        {loading && <Loading />}
      </div>
    </>
  );
}

import { ProductDetailType } from "@/types/product";
import { Suspense } from "react";
import { Loader } from "@/components/ui";
import ProductDetail from "./components/ProductDetail";

export default async function ProductDetailsScreen(props: ProductDetailType) {
  return (
    <Suspense fallback={<Loader />}>
      <ProductDetail {...props} />
    </Suspense>
  );
}

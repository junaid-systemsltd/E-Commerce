import { Suspense } from "react";
import { Loader } from "@components/ui";
import LatestProducts from "@app/(main)/components/LatestProducts";

export default async function HomeScreen() {
  return (
    <Suspense fallback={<Loader />}>
      <LatestProducts />
    </Suspense>
  );
}

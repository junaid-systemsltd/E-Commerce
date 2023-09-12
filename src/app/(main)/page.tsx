import { IProduct } from "@/types/product";
import Product from "./components/Product";
import { fetchProductsList } from "@/services/products";

export default async function Home() {
  const products = await fetchProductsList();
  return (
    <>
      <h1>Latest Products</h1>
      {products?.length > 0 && (
        <>
          <div className="row">
            {products.map((product: IProduct) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 col-xl-3"
                key={product.id}
              >
                <Product {...product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

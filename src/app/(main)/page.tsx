import { PrismaClient } from "@prisma/client";
import { IProduct } from "@/types/product";
import { Col } from "react-bootstrap";
import Product from "./components/Product";
// import Product from "./components/Product";

const prisma = new PrismaClient();

const fetchProductsList = async (): Promise<IProduct[]> => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      brand: true,
      category: true,
      description: true,
      rating: true,
      numReviews: true,
      price: true,
      count_in_stock: true,
    },
  });
  return products;
};

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

import { IProduct } from "@/types/product";
import { fetchProductsList } from "@/services/products";
import { Col, Row } from "@/components/ui";
import Product from "@/app/(main)/components/Product";

export default async function LatestProducts() {
  const products = await fetchProductsList();
  return (
    <>
      <h1>Latest Products</h1>
      {products?.length > 0 && (
        <>
          <Row>
            {products.map((product: IProduct) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product {...product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

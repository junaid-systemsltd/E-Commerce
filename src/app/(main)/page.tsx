import { IProduct } from "@/types/product";
import { Col, Row } from "@/components/elements";
import { fetchProductsList } from "@/core/services/products";
import Product from "./components/product";

export default async function HomeScreen() {
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

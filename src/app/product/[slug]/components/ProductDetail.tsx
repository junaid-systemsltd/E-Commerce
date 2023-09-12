import Link from "next/link";
import Rating from "@/components/Rating";
import { fetchProduct } from "@/services/products";
import { IProduct, ProductDetailType } from "@/types/product";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Message,
  Col,
  Button,
} from "@components/ui";

export default async function ProductDetail(props: ProductDetailType) {
  const slug = props.params?.slug || "";

  const product: IProduct = await fetchProduct(slug);

  return (
    <>
      <Link className="btn btn-light my-3" href="..">
        GO Back
      </Link>
      <Row>
        {/* Product Image Section */}
        <Col md={6}>
          <img className="fluid" src={product.image} alt={product.name} />
        </Col>

        {/* Product Details Section */}
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>

            <ListGroupItem> Price: ${product.price} </ListGroupItem>

            <ListGroupItem> Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>

        {/* Product Purchase Details Section */}
        <Col md={3}>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col> Price: </Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col>Status:</Col>
                <Col>
                  <strong>
                    {product.count_in_stock > 0 ? "In Stock" : "Out of Stock"}
                  </strong>
                </Col>
              </Row>
            </ListGroupItem>

            {product.count_in_stock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col>Qty:</Col>
                  <Col>
                    <select className="form-control">
                      {[...Array(product.count_in_stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </ListGroupItem>
            )}
            <ListGroup>
              <ListGroupItem>
                <Button
                  className="w-100"
                  disabled={product.count_in_stock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {product?.reviews?.length === 0 && <Message> No Reviews </Message>}
        </Col>
      </Row>
    </>
  );
}

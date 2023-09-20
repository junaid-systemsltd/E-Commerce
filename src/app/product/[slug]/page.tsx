import Link from "next/link";
import Rating from "@/components/modules/rating";
import { fetchProduct } from "@/core/services/products";
import { IProduct, ProductDetailType, ReviewType } from "@/types/product";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Message,
  Col,
  Button,
} from "@/components/elements";

export default async function ProductDetails(props: ProductDetailType) {
  const slug = props.params.slug || "";
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

      {/* Product Review Section */}
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {product?.reviews?.length === 0 && <Message> No Reviews </Message>}
          <ListGroup variant="flush">
            {product?.reviews?.map((review: ReviewType) => {
              return (
                <ListGroupItem key={review.id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.created_at?.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroupItem>
              );
            })}
            <ListGroupItem>
              <h2>Write a Customer Review</h2>
              <Message>
                Please <Link href="/login"> Sign in</Link> to write a review
              </Message>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

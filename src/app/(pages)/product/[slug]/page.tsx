import Link from 'next/link';
import Rating from '@/components/modules/rating';
import { fetchProduct } from '@/core/services/products';
import { IProduct, ProductDetailType, ReviewType } from '@/types/product';
import {
    ListGroup,
    ListGroupItem,
    Row,
    Message,
    Col,
} from '@/components/elements';
import ProductPurchaseDetails from './components/product-purchase-details';
import ProductRating from './components/product-rating';

export default async function ProductDetails(props: ProductDetailType) {
    const slug = props.params.slug || '';
    const product: IProduct = await fetchProduct(slug);

    return (
        <>
            <Link className="btn btn-light my-3" href="..">
                GO Back
            </Link>
            <Row>
                {/* Product Image Section */}
                <Col md={6}>
                    <img
                        className="fluid"
                        src={product.image}
                        alt={product.name}
                    />
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

                        <ListGroupItem>
                            {' '}
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                {/* Product Purchase Details Section */}
                <ProductPurchaseDetails product={product} slug={slug} />
            </Row>

            {/* Product Review Section */}
            <ProductRating reviews={product.reviews} />
        </>
    );
}

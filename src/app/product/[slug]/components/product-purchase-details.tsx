'use client';
import {
    Button,
    Col,
    ListGroup,
    ListGroupItem,
    Row,
} from '@/components/elements';
import { IProduct } from '@/types/product';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ProductPurchaseDetailsProps = {
    product: IProduct;
    slug: string;
};

export default function ProductPurchaseDetails({
    product,
    slug,
}: ProductPurchaseDetailsProps) {
    const [qty, setQty] = useState(1);
    const router = useRouter();

    const addToCartHandler = () => {
        router.push(`/cart?product_id=${slug}&qty=${qty}`);
    };

    return (
        <>
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
                                    {product.count_in_stock > 0
                                        ? 'In Stock'
                                        : 'Out of Stock'}
                                </strong>
                            </Col>
                        </Row>
                    </ListGroupItem>

                    {product.count_in_stock > 0 && (
                        <ListGroupItem>
                            <Row>
                                <Col>Qty:</Col>
                                <Col>
                                    <select
                                        className="form-control"
                                        value={qty}
                                        onChange={(event: any) =>
                                            setQty(event.currentTarget.value)
                                        }
                                    >
                                        {[
                                            ...Array(
                                                product.count_in_stock,
                                            ).keys(),
                                        ].map(x => (
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
                                onClick={addToCartHandler}
                            >
                                Add to Cart
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </ListGroup>
            </Col>
        </>
    );
}

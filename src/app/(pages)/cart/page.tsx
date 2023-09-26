'use client';
// Libs
import Link from 'next/link';
import { useEffect } from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    FormSelect,
    Image,
    ListGroup,
    Row,
} from 'react-bootstrap';
import { useRouter } from 'next/navigation';
// Modules
import { Message } from '@/components/elements';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/UserContext';
import Spinner from '@/components/elements/spinner';
import useQueryParams from '@/core/hooks/useQueryParams';

export default function Cart() {
    const { cartItems, addToCart, removeFromCart, loading } = useCart();
    const { setQueryParams, queryParams } = useQueryParams();
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            if (queryParams.has('product_id')) {
                const qty = queryParams.get('qty') || 0;
                const product_id = queryParams.get('product_id') || '';
                await addToCart(product_id, Number(qty));
                setQueryParams({ product_id: null, qty: null });
            }
        })();
    }, []);

    const checkoutHandler = () => {
        user ? router.push('/shipping') : router.push('/login');
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <Row>
                    <Col md={8}>
                        <h1>Shopping Cart</h1>
                        {cartItems.length === 0 ? (
                            <Message>
                                {' '}
                                Your cart is empty{' '}
                                <Link href="..">Go Back</Link>{' '}
                            </Message>
                        ) : (
                            <ListGroup.Item variant="flush">
                                {cartItems.map((item, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        className="mt-2"
                                    >
                                        <Row className="align-items-center">
                                            <Col md={2}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Link
                                                    href={`/product/${item.product}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                <FormSelect
                                                    as="select"
                                                    value={Number(item.qty)}
                                                    onChange={e => {
                                                        addToCart(
                                                            item.product.toString(),
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        );
                                                    }}
                                                >
                                                    {[
                                                        ...Array(
                                                            item.count_in_stock,
                                                        ).keys(),
                                                    ].map(x => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </FormSelect>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    type="button"
                                                    variant="light"
                                                    onClick={() => {
                                                        removeFromCart(
                                                            item.product.toString(),
                                                        );
                                                    }}
                                                >
                                                    <i className="fas fa-trash" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup.Item>
                        )}
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>
                                        Subtotal (
                                        {cartItems.reduce(
                                            (acc: number, item: any) =>
                                                acc + item.qty,
                                            0,
                                        )}
                                        )
                                    </h2>
                                    $
                                    {cartItems
                                        .reduce(
                                            (acc: number, item: any) =>
                                                acc + item.qty * item.price,
                                            0,
                                        )
                                        .toFixed(2)}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        className="btn-block"
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}

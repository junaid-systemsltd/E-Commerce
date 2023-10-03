'use client';
// Libs
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';

// Modules
import { Order } from '@/types/order';
import { useCart } from '@/contexts/CartContext';
import { Message } from '@/components/elements';
import { useAuth } from '@/contexts/UserContext';
import CheckoutSteps from '../shipping/components/CheckoutSteps';
import { addOrderItemsActions } from '@/core/actions/orderActions';

export default function PlaceOrder() {
    const { user } = useAuth();
    const router = useRouter();

    const [isLoading, setLoading] = useState(false);

    const {
        shippingAddress,
        paymentMethod,
        cartItems,
        prices,
        setPrices,
        clearData,
    } = useCart();

    // Destructuring
    const { address, city, country, postalCode } = shippingAddress;
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = prices;

    const addDecimals = useCallback((num: number): number => {
        return Number((Math.round(num * 100) / 100).toFixed(2));
    }, []);

    useEffect(() => {
        if (cartItems.length === 0) router.replace('/cart');
    }, []);

    useEffect(() => {
        const itemsPrice = addDecimals(
            cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
        );
        const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 100);

        const taxPrice = addDecimals(
            Number((0.15 * Number(itemsPrice)).toFixed(2)),
        );

        const totalPrice = Number(
            (
                Number(itemsPrice) +
                Number(shippingPrice) +
                Number(taxPrice)
            ).toFixed(2),
        );

        setPrices({
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        });
    }, []);

    const placeOrderHandler = async () => {
        setLoading(true);
        try {
            const order: Order = {
                itemsPrice,
                orderItems: cartItems,
                paymentMethod,
                shippingAddress,
                shippingPrice,
                taxPrice,
                totalPrice,
            };
            const newOrder = await addOrderItemsActions(order, user.id);

            if (newOrder) {
                setLoading(false);
                toast.success('Order successfully created.');
                await clearData();
                // @ts-ignore
                router.push(`/order/${newOrder?.id}`);
            }
        } catch (e) {
            toast.error('Something went wrong');
            console.error(e);
            setLoading(false);
        }
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {`${address}, ${city}, ${postalCode}, ${country}`}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? (
                                <Message>Your cart is Empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        href={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} =
                                                    $
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Items </Col>
                                    <Col> ${itemsPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Shipping </Col>
                                    <Col> ${shippingPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Tax </Col>
                                    <Col> ${taxPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Total </Col>
                                    <Col> ${totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="w-100"
                                    disabled={
                                        cartItems.length === 0 || isLoading
                                    }
                                    onClick={placeOrderHandler}
                                >
                                    {isLoading ? 'Processing' : 'Place Order'}
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

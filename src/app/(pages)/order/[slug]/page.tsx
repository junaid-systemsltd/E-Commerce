'use client';
// Libs
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
// Modules
import { Message } from '@/components/elements';
import { useAuth } from '@/contexts/UserContext';
import Spinner from '@/components/elements/spinner';
import { fetchOrdersById } from '@/core/services/orders';

type OrderProps = {
    params: {
        slug?: string;
    };
};

export default function Order(props: OrderProps) {
    const orderId = props.params.slug || '';
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        fetchOrdersById(orderId)
            .then(order => setOrder(order))
            .catch(error => console.error(error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            {' '}
            <h1>Order ({orderId})</h1>{' '}
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong>
                                        {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        <a href={`mailto: ${order.user.email}`}>
                                            {order?.user?.email}
                                        </a>
                                    </p>
                                    <p>
                                        <strong>Address:</strong>
                                        {order.shipping_address.address},
                                        {order.shipping_address.city} ,
                                        {order.shipping_address.postal_code}
                                        {order.shipping_address.country}
                                    </p>
                                    {order.is_delivered ? (
                                        <Message variant="success">
                                            {order.is_delivered}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            Not Delivered
                                        </Message>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <p>
                                        <h2>Payment Method</h2>
                                        <strong>Method: </strong>
                                        {order?.paymentMethod}
                                    </p>
                                    {order.is_paid ? (
                                        <Message variant="success">
                                            {order?.is_paid}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            Not Paid
                                        </Message>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order?.order_items.length === 0 ? (
                                        <Message>Your cart is Empty</Message>
                                    ) : (
                                        <ListGroup variant="flush">
                                            {order?.order_items.map(
                                                (item: any, index: number) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                    fluid
                                                                    rounded
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Link
                                                                    href={`/product/${item.id}`}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x $
                                                                {item.price} = $
                                                                {item.qty *
                                                                    item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ),
                                            )}
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
                                        {/* <Row>
                                            <Col> Items </Col>
                                            <Col> ${order?.itemsPrice} </Col>
                                        </Row> */}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col> Shipping </Col>
                                            <Col> ${order.shipping_price} </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col> Tax </Col>
                                            <Col> ${order.tax_price} </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col> Total </Col>
                                            <Col> ${order.total_price} </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {user &&
                                        user.isAdmin &&
                                        order?.is_paid &&
                                        !order?.is_delivered && (
                                            <ListGroup.Item>
                                                <Button
                                                    type="button"
                                                    className="btn btn-block"
                                                    // onClick={deliverHandler()}
                                                >
                                                    Mark As Delivered
                                                </Button>
                                            </ListGroup.Item>
                                        )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
}

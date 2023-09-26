'use client';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';

export default function CheckoutSteps({ step1, step2, step3, step4 }: any) {
    return (
        <>
            <Nav className="justify-content-center mb-4">
                <Nav.Item>
                    {step1 ? (
                        <Link className="nav-link" href="/login">
                            <strong>Sign In </strong>
                        </Link>
                    ) : (
                        <Nav.Link disabled> Sign In</Nav.Link>
                    )}
                </Nav.Item>
                <Nav.Item>
                    {step2 ? (
                        <Link className="nav-link" href="/shipping">
                            <strong>Shipping</strong>
                        </Link>
                    ) : (
                        <Nav.Link disabled> Shipping</Nav.Link>
                    )}
                </Nav.Item>
                <Nav.Item>
                    {step3 ? (
                        <Link className="nav-link" href="/payment">
                            Payment
                        </Link>
                    ) : (
                        <Nav.Link disabled> Payment </Nav.Link>
                    )}
                </Nav.Item>
                <Nav.Item>
                    {step4 ? (
                        <Link className="nav-link" href="/placeorder">
                            Place Order
                        </Link>
                    ) : (
                        <Nav.Link disabled> Place Order </Nav.Link>
                    )}
                </Nav.Item>
            </Nav>
        </>
    );
}

'use client';
import { FormContainer } from '@/components/elements';
import CheckoutSteps from '../shipping/components/CheckoutSteps';
import { Button, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { PaymentMethods } from '@/types/cart';

export default function Payment() {
    const { savePaymentMethod, shippingAddress } = useCart();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState(PaymentMethods.Paypal);

    if (!shippingAddress.address) router.push('/shipping');

    const submitHandler = (e: any) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        router.push('/place-order');
    };

    return (
        <>
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as="legend"> Select Method </Form.Label>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="Paypal or Credit Card"
                                id="Paypal"
                                name="paymentMethod"
                                value={PaymentMethods.Paypal}
                                checked
                                onChange={e =>
                                    setPaymentMethod(PaymentMethods.Paypal)
                                }
                            ></Form.Check>
                            <Form.Check
                                type="radio"
                                label="Stripe or Credit Card"
                                id="Stripe"
                                name="paymentMethod"
                                value={PaymentMethods.Stripe}
                                onChange={e =>
                                    setPaymentMethod(PaymentMethods.Stripe)
                                }
                            ></Form.Check>
                        </Col>
                    </Form.Group>
                    <Button className="mt-3" type="submit" value="primary">
                        {' '}
                        Continue{' '}
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
}

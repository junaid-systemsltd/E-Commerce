'use client';

// Libs
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';
// Modules
import { useCart } from '@/contexts/CartContext';
import { FormContainer } from '@/components/elements';
import CheckoutSteps from './components/CheckoutSteps';

export default function Shipping() {
    const { shippingAddress, saveShippingAddress } = useCart();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const router = useRouter();

    const onSubmitHandler = (e: any) => {
        e.preventDefault();

        saveShippingAddress({ address, city, postalCode, country });
        router.push('/payment');
    };
    return (
        <>
            <FormContainer>
                <CheckoutSteps step1 step2 />
                <h1>Shipping</h1>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group controlId="address">
                        <Form.Label>Address:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            required
                            onChange={e => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>City:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            required
                            onChange={e => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="postalCode">
                        <Form.Label>Postal Code:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter postal code"
                            value={postalCode}
                            required
                            onChange={e => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="country">
                        <Form.Label>Country:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            required
                            onChange={e => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button className="mt-4" type="submit" variant="primary">
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
}

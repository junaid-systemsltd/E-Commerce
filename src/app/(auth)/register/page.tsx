'use client';

// Libs
import Link from 'next/link';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
// Modules
import { registerAction } from '@/core/actions/userActions';
import { FormContainer, Message, SubmitButton } from '@/components/elements';

export default function Register() {
    const [errors, setErrors] = useState<any>(null);

    const submitHandler = async (formData: FormData) => {
        try {
            const response = await registerAction(formData);

            if (!response?.status) return setErrors(response?.errors);

            const { message = '', user } = response;
        } catch (e: any) {}
    };

    return (
        <FormContainer>
            <h1>Register</h1>

            {errors && (
                <Message variant={'danger'}>
                    {errors.map((error: any, index: number) => (
                        <li key={index}>{error.message}</li>
                    ))}
                </Message>
            )}

            <Form action={submitHandler}>
                {/* Name Field */}
                <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        name="name"
                        placeholder="Enter Name"
                    ></Form.Control>
                </Form.Group>
                {/* Email Field */}
                <Form.Group controlId="email">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                    ></Form.Control>
                </Form.Group>
                {/* Password Field */}
                <Form.Group className="pt-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Enter password"
                    ></Form.Control>
                </Form.Group>
                {/* Confirm Password */}
                <Form.Group className="pt-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder="Enter Confirm password"
                    ></Form.Control>
                </Form.Group>
                <SubmitButton btnText="Register" loadingText="Registering" />
            </Form>
            <Row className="py-3">
                <Col>
                    Have an already account ?{' '}
                    <Link href={'/auth/login'}> Login </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

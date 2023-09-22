'use client';

import { FormContainer, SubmitButton } from '@/components/elements';
import Link from 'next/link';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export default function Register() {
    const [errors, setErrors] = useState<any>(null);

    const actionHandler = () => {};

    return (
        <FormContainer>
            <h1>Register</h1>

            <Form action={actionHandler}>
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
                <Form.Group className="pt-3" controlId="password">
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

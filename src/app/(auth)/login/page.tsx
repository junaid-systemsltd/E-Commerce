'use client';

// Libs
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

// Modules
import { loginAction } from '../actions';
import { useAuth } from '@/contexts/UserContext';
import { FormContainer, Message } from '@/components/elements';

export default function Login() {
    const { setUser } = useAuth();
    const router = useRouter();
    const [errors, setErrors] = useState<any>(null);

    const submitHandler = async (formData: FormData) => {
        try {
            const response = await loginAction(formData);

            if (!response?.status) return setErrors(response?.errors);

            const { message = '', user } = response;

            setUser(user);
            toast.success(message);
            router.push('/');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <FormContainer>
            <h1>Sign in</h1>

            {errors && (
                <Message variant={'danger'}>
                    {errors.map((error: any, index: number) => (
                        <li key={index}>{error.message}</li>
                    ))}
                </Message>
            )}

            <Form action={submitHandler}>
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
                <SubmitButton />
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer ? <Link href={'/register'}> Register </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

/* Separate Submit Button due to  useFormStatus Hook*/
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            className="my-3 w-100"
            type="submit"
            variant="primary"
            disabled={pending}
        >
            {pending ? 'Signing in' : 'Sign in'}
        </Button>
    );
}

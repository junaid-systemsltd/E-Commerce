'use client';

// Libs
import { useState } from 'react';
import { Col, Form, Row, Table } from 'react-bootstrap';
// Modules
import { useAuth } from '@/contexts/UserContext';
import Spinner from '@/components/elements/spinner';
import { Message, SubmitButton } from '@/components/elements';
import { profileUpdateAction } from '@/core/actions/userActions';

export default function Profile() {
    const { user, setUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>(null);
    const [successStatus, setSuccessStatus] = useState(false);

    const submitHandler = async (formData: FormData) => {
        const response = await profileUpdateAction(formData);

        if (!response?.status) return setErrors(response?.errors);

        const { user } = response;
        setSuccessStatus(true);
        setUser(user);
    };

    return (
        <>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    {/* Error Section */}
                    {errors && (
                        <Message variant={'danger'}>
                            {errors.map((error: any, index: number) => (
                                <li key={index}>{error.message}</li>
                            ))}
                        </Message>
                    )}
                    {/* Success Section */}
                    {successStatus && (
                        <Message variant="success"> Profile Updated </Message>
                    )}

                    {/* From Section */}
                    <Form action={submitHandler}>
                        <Form.Group controlId="id">
                            <Form.Control
                                name="id"
                                type="hidden"
                                value={user.id}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter confirm Password"
                            ></Form.Control>
                        </Form.Group>
                        <SubmitButton btnText="Update" loadingText="Updating" />
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                className="table-sm"
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </Table>
                        </>
                    )}
                </Col>
            </Row>
        </>
    );
}

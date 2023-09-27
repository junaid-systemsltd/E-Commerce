'use client';
// Libs
import Link from 'next/link';
import { useState } from 'react';
import { Button, Col, Form, FormSelect, ListGroup, Row } from 'react-bootstrap';
// Modules
import { ReviewType } from '@/types/product';
import { Message } from '@/components/elements';
import Rating from '@/components/modules/rating';
import { useAuth } from '@/contexts/UserContext';

export default function ProductRating({ reviews = [] }: any) {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const submitHandler = (e: any) => {
        e.preventDefault();
        console.log({ rating, comment });
    };

    return (
        <Row>
            <Col md={6}>
                <h2>Reviews</h2>
                {reviews?.length === 0 && <Message> No Reviews </Message>}
                <ListGroup variant="flush">
                    {reviews?.map((review: ReviewType) => {
                        return (
                            <ListGroup.Item key={review.id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                <p>{review.created_at?.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        );
                    })}
                    <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {user ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="rating">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as={FormSelect}
                                        value={rating}
                                        onChange={e =>
                                            setRating(Number(e.target.value))
                                        }
                                    >
                                        <option value="">Select...</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="comment">
                                    <Form.Label>Comment </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={comment}
                                        onChange={e =>
                                            setComment(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <Button
                                    className="mt-3"
                                    type="submit"
                                    variant="primary"
                                >
                                    Submit
                                </Button>
                            </Form>
                        ) : (
                            <Message>
                                Please <Link href="/login"> Sign in</Link> to
                                write a review
                            </Message>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    );
}

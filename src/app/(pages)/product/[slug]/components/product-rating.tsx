'use client';
// Libs
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Col, Form, FormSelect, ListGroup, Row } from 'react-bootstrap';
// Modules
import { ReviewType } from '@/types/product';
import { useAuth } from '@/contexts/UserContext';
import Rating from '@/components/modules/rating';
import extractFormData from '@/core/utils/extractFormData';
import { Message, SubmitButton } from '@/components/elements';
import { addProductReview } from '@/core/actions/ratingActions';

export default function ProductRating({ reviews = [], productId }: any) {
    const { user } = useAuth();

    const submitHandler = async (formData: FormData) => {
        const userRating = extractFormData(formData);
        const { status, error, message } = await addProductReview(
            userRating,
            user,
            productId,
        );

        // Show error on status false
        if (!status) return toast.error(error);

        // Show Success message
        toast.success(message);
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
                                <p>
                                    {review.created_at
                                        .toString()
                                        .substring(0, 10)}
                                </p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        );
                    })}
                    <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {user ? (
                            <Form action={submitHandler}>
                                <Form.Group controlId="rating">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as={FormSelect} name="rating">
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
                                        name="comment"
                                    ></Form.Control>
                                </Form.Group>
                                <SubmitButton
                                    btnText="Submit"
                                    loadingText="Submitting"
                                ></SubmitButton>
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

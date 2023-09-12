"use client";

import FormContainer from "@/components/ui/FormContainer";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Sign in
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer ? <Link href={"/register"}> Register </Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  );
}

import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function FormContainer({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

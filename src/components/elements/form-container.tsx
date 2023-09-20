import React, { ReactNode } from "react";
import { Col, Row, Container } from "@/components/elements";

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

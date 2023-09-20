"use client";

import Link from "next/link";
import { Card } from "react-bootstrap";

import Rating from "@/components/modules/rating";
import { IProduct } from "@/types/product";

export default function Product(props: IProduct) {
  const { id, image, name, rating, numReviews, price } = props;
  return (
    <Card className="my-3 p-3 rounded">
      <Link href={`/product/${id}`}>
        <Card.Img src={image} variant="top" />
      </Link>

      <Card.Body>
        <Link href={`/product/${id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as="div">
        <Rating value={rating} text={`${numReviews} reviews`} />
      </Card.Text>
      <Card.Text as="h3">${price}</Card.Text>
    </Card>
  );
}

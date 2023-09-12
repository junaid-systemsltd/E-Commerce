import Rating from "@/components/Rating";
import prisma from "@/helpers/prisma";
import { fetchProduct } from "@/services/products";
import { IProduct, ProductDetailType } from "@/types/product";
import Link from "next/link";

export default async function ProductDetails(props: ProductDetailType) {
  const slug = props.params.slug;

  const product: IProduct = await fetchProduct(slug);

  return (
    <>
      <Link className="btn btn-light my-3" href="...">
        GO Back
      </Link>
      <div className="row">
        <div className="col-md-6">
          <img className="fluid" src={product.image} alt={product.name} />
        </div>
        <div className="col-md-3">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {" "}
              <h3>{product.name}</h3>
            </li>
            <li className="list-group-item">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </li>
            <li className="list-group-item"> Price: ${product.price}</li>
            <li className="list-group-item">
              {" "}
              Description: {product.description}
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <ul className="list-group">
            <li className="list-group-item">
              <div className="row">
                <div className="col">Price:</div>
                <div className="col">
                  <strong>${product.price}</strong>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col">Status:</div>
                <div className="col">
                  <strong>
                    {" "}
                    {product.count_in_stock > 0 ? "In Stock" : "Out of Stock"}
                  </strong>
                </div>
              </div>
            </li>
            {product.count_in_stock > 0 && (
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Qty:</div>
                  <div className="col">
                    <select className="form-control">
                      {[...Array(product.count_in_stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </li>
            )}
            <ul className="list-group">
              <li className="list-group-item">
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={product.count_in_stock === 0}
                >
                  Add to Cart
                </button>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
}

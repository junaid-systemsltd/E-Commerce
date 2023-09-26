'use client';
import { Table } from 'react-bootstrap';
import ProductListItem from './ProductsListItem';

export default function ProductLists({ products }: any) {
    return (
        <>
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: any) => (
                        <ProductListItem {...product} />
                    ))}
                </tbody>
            </Table>
        </>
    );
}

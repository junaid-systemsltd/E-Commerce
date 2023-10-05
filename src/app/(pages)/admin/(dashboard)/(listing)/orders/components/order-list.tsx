'use client';

import { Table } from 'react-bootstrap';
import OrderListItem from './order-list-item';

type OrderListProps = {
    orders: any[];
};

export default function OrderList({ orders }: OrderListProps) {
    return (
        <Table striped bordered hover responsive className="table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order: any) => (
                    <OrderListItem key={order.id} {...order} />
                ))}
            </tbody>
        </Table>
    );
}

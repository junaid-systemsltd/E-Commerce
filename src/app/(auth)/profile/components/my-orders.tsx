// Libs
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

// Modules
import { useAuth } from '@/contexts/UserContext';
import Spinner from '@/components/elements/spinner';
import { getUserOrders } from '@/core/actions/orderActions';

export default function MyOrders() {
    const { user } = useAuth();

    const [orders, setOrders] = useState<any>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (user) {
                try {
                    setLoading(true);
                    const _orders = await getUserOrders(user.id);
                    setOrders(_orders);
                } catch (e) {
                    toast.error('Something went wrong');
                } finally {
                    setLoading(false);
                }
            }
        })();
    }, []);

    return (
        <>
            <h2>My Orders</h2>
            {isLoading ? (
                <Spinner />
            ) : (
                <Table striped bordered hover responsive className="table-sm">
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
                    <tbody>
                        {orders.map((order: any) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>
                                    {order.created_at
                                        .toString()
                                        .substring(0, 10)}{' '}
                                </td>
                                <td>{order.total_price}</td>
                                <td>
                                    {order.is_paid ? (
                                        order.paid_at
                                            .toString()
                                            .substring(0, 10)
                                    ) : (
                                        <i
                                            className="fa fa-times"
                                            style={{ color: 'red' }}
                                        />
                                    )}
                                </td>

                                <td>
                                    {order.is_delivered ? (
                                        order.delivered_at
                                            .toString()
                                            .substring(0, 10)
                                    ) : (
                                        <i
                                            className="fa fa-times"
                                            style={{ color: 'red' }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <Link href={`/order/${order.id}`}>
                                        <Button
                                            className="btn-sm"
                                            variant="light"
                                        >
                                            Details{' '}
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}

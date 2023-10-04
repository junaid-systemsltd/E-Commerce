import { User } from '@prisma/client';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

type OrderListProps = {
    id: number;
    user: User;
    created_at: Date;
    total_price: number;
    paid_at: Date;
    deliver_at: Date;
    is_paid: boolean;
    is_delivered: boolean;
};

export default function OrderListItem({
    id,
    user,
    created_at,
    total_price,
    is_paid,
    paid_at,
    deliver_at,
    is_delivered,
}: OrderListProps) {
    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{user && user.name}</td>
            <td>{created_at.toString().substring(0, 10)} </td>
            <td>{total_price}</td>
            <td>
                {is_paid ? (
                    paid_at.toString().substring(0, 10)
                ) : (
                    <i className="fas fa-times" style={{ color: 'red' }} />
                )}
            </td>
            <td>
                {is_delivered ? (
                    deliver_at.toString().substring(0, 10)
                ) : (
                    <i className="fas fa-times" style={{ color: 'red' }} />
                )}
            </td>
            <td>
                <Link href={`/order/${id}`}>
                    <Button variant="light" className="btn-sm">
                        Details
                    </Button>
                </Link>
            </td>
        </tr>
    );
}

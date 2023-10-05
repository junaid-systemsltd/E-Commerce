import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function UserListItem({ id, name, email, isAdmin }: any) {
    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>
                <a href={`mailto:${email}`}>{email}</a>
            </td>
            <td>
                {isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }} />
                ) : (
                    <i className="fas fa-times" style={{ color: 'red' }} />
                )}
            </td>
            <td>
                <Link href={`/admin/user/${id}/edit`}>
                    <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                    </Button>
                </Link>
                <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => alert('Delete Handler')}
                >
                    <i className="fas fa-trash" />
                </Button>
            </td>
        </tr>
    );
}

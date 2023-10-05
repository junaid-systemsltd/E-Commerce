import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function ProductListItem({
    id,
    name,
    price,
    category,
    brand,
}: any) {
    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>$ {price}</td>
            <td>{category}</td>
            <td>{brand}</td>
            <td>
                <Link href={`/admin/product/${id}/edit`}>
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

'use client';

import { Table } from 'react-bootstrap';
import UserListItem from './UserListItem';

export default function UserList({ users }: any) {
    return (
        <Table striped bordered hover responsive className="table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: any, index: number) => (
                    <UserListItem key={index} {...user} />
                ))}
            </tbody>
        </Table>
    );
}

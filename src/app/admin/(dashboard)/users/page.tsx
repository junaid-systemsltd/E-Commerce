'use server';
import { fetchUsersList } from '@/core/services/users.service';
import UserList from './components/UsersList';

export default async function Users() {
    const users = await fetchUsersList();
    return <UserList users={users} />;
}

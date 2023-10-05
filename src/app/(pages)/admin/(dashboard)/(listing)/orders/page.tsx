import { fetchAllOrders } from '@/core/services/orders';
import OrderList from './components/order-list';

export default async function Orders() {
    const orders = await fetchAllOrders();
    return <OrderList orders={orders} />;
}

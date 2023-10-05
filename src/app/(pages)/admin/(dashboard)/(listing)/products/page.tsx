import { fetchProductsList } from '@/core/services/products';
import ProductLists from './components/ProductsList';

export default async function Products() {
    const products = await fetchProductsList();
    return <ProductLists products={products} />;
}

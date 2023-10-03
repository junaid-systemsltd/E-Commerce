import ProductLists from './components/ProductsList';

// Dummy data
const products: any = [
    {
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        description:
            'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
        brand: 'Apple',
        category: 'Electronics',
        price: 89.99,
        count_in_stock: 10,
        rating: 4.5,
        num_of_reviews: 12,
    },
    {
        name: 'iPhone 11 Pro 256GB Memory',
        image: '/images/phone.jpg',
        description:
            'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
        brand: 'Apple',
        category: 'Electronics',
        price: 599.99,
        count_in_stock: 7,
        rating: 4.0,
        num_of_reviews: 8,
    },
    {
        name: 'Cannon EOS 80D DSLR Camera',
        image: '/images/camera.jpg',
        description:
            'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
        brand: 'Cannon',
        category: 'Electronics',
        price: 929.99,
        count_in_stock: 5,
        rating: 3,
        num_of_reviews: 12,
    },
    {
        name: 'Sony Playstation 4 Pro White Version',
        image: '/images/playstation.jpg',
        description:
            'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
        brand: 'Sony',
        category: 'Electronics',
        price: 399.99,
        count_in_stock: 11,
        rating: 5,
        num_of_reviews: 12,
    },
    {
        name: 'Logitech G-Series Gaming Mouse',
        image: '/images/mouse.jpg',
        description:
            'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
        brand: 'Logitech',
        category: 'Electronics',
        price: 49.99,
        count_in_stock: 7,
        rating: 3.5,
        num_of_reviews: 10,
    },
    {
        name: 'Amazon Echo Dot 3rd Generation',
        image: '/images/alexa.jpg',
        description:
            'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
        brand: 'Amazon',
        category: 'Electronics',
        price: 29.99,
        count_in_stock: 0,
        rating: 4,
        num_of_reviews: 12,
    },
];

export default function Products() {
    return <ProductLists products={products} />;
}

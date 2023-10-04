'use client';

// Lib
import Link from 'next/link';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

// Module
import { useAuth } from '@/contexts/UserContext';
import { logoutAction } from '@/core/actions/userActions';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
    const { push } = useRouter();
    const pathname = usePathname();
    const { cartItems } = useCart();
    const { user, setUser } = useAuth();

    const logoutHandler = async () => {
        setUser(null);
        await logoutAction();
        toast.success('You have been logged out!');
        push('/');
    };

    return (
        <header>
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                collapseOnSelect
                sticky="top"
            >
                <Container>
                    <Link href="/">
                        <Navbar.Brand>Shop</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link
                                className={`nav-link ${
                                    pathname === '/cart' ? 'active' : ''
                                }`}
                                href="/cart"
                            >
                                <i className="fas fa-shopping-cart" /> Cart{' '}
                                {cartItems.length > 0 &&
                                    `(${cartItems.length})`}{' '}
                            </Link>

                            {user ? (
                                <>
                                    {' '}
                                    <NavDropdown
                                        title={user.name}
                                        id="username"
                                    >
                                        <NavDropdown.Item
                                            as={Link}
                                            href="/profile"
                                        >
                                            Profile
                                        </NavDropdown.Item>

                                        <NavDropdown.Item
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <Link
                                    className={`nav-link ${
                                        pathname === '/login' ? 'active' : ''
                                    }`}
                                    href="/login"
                                >
                                    <i className="fas fa-user" /> Sign In
                                </Link>
                            )}
                            {user?.isAdmin && (
                                <NavDropdown
                                    title="Admin"
                                    id="admin_menu"
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item
                                        as={Link}
                                        href="/admin/users"
                                        role="button"
                                    >
                                        {' '}
                                        Users{' '}
                                    </NavDropdown.Item>

                                    <NavDropdown.Item
                                        as={Link}
                                        href="/admin/products"
                                        role="button"
                                    >
                                        {' '}
                                        Products{' '}
                                    </NavDropdown.Item>

                                    <NavDropdown.Item
                                        as={Link}
                                        href="/admin/orders"
                                        role="button"
                                    >
                                        {' '}
                                        Orders{' '}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;

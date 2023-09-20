'use client';

// Lib
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

// Module
import { useAuth } from '@/contexts/UserContext';
import { logoutAction } from '@/core/actions/userActions';

const Header = () => {
    const { user, setUser } = useAuth();

    const logoutHandler = async () => {
        setUser(null);
        await logoutAction();
        toast.success('You have been logged out!');
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Link href="/">
                        <Navbar.Brand>Shop</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link className="nav-link" href="/cart">
                                <i className="fas fa-shopping-cart" /> Cart
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
                                <Link className="nav-link" href="/login">
                                    <i className="fas fa-user" /> Sign In
                                </Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;

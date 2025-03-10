import { useEffect, useState } from "react";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button, Badge } from "react-bootstrap";
import { getCartDataAsync } from "../services/Action/ProductAction";
import { auth } from "../config/firebase";
import logo from '../image/fkheaderlogo_exploreplus-44005d.svg'
import "./button.css"

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartData = useSelector((state) => state.productReducer.cartData);
    const products = useSelector((state) => state.productReducer.products); // Fetch products from Redux
    const user = auth.currentUser;

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getCartDataAsync());
    }, [dispatch]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter products by name, price, or category
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.price.toString().includes(searchTerm)
    );

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchTerm}`, { state: { filteredProducts } });
    };

    const signOut = () => {
        auth.signOut();
        navigate("/login");
    };

    return (
        <Navbar expand="md">
            <Container className="bg-light ">
                <Navbar.Brand as={Link} to="/" className="text-white fw-bold fs-4">
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav" className="m-4">
                    {/* Search Input */}
                    <Form className="d-flex mx-auto my-2 my-md-0 w-50" onSubmit={handleSearchSubmit}>
                        <div className="position-relative w-100">
                            <Form.Control
                                type="text"
                                placeholder="Search by name, price, or category..."
                                className="form-control bg-secondary-emphasis text-light ps-4 rounded"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <Button type="submit" variant="secondary-emphasis" className="position-absolute top-50 end-0 translate-middle-y me-2">
                                <FiSearch />
                            </Button>
                        </div>
                    </Form>

                    <Nav className="ms-auto d-flex align-items-center gap-3">
                        <Nav.Link as={Link} to="/" className="text-dark">Home</Nav.Link>
                        <Nav.Link as={Link} to="/checkout" className="text-dark">Orders</Nav.Link>

                        <Nav.Link as={Link} to="/AddToCard" className="text-dark position-relative">
                            <FiShoppingCart className="me-1" /> Cart
                            {cartData.length > 0 && (
                                <Badge bg="danger" className="position-absolute rounded-pill" style={{ transform: ('7%, 12%') }}>
                                    {cartData.length}
                                </Badge>
                            )}
                        </Nav.Link>

                        {user ? (
                            <Button variant="primary" className="d-flex align-items-center button-29" onClick={signOut}>
                                <FiUser className="me-1" /> Logout
                            </Button>
                        ) : (
                            <Button variant="primary" className="d-flex align-items-center button-29" onClick={() => navigate("/login")}>
                                <FiUser className="me-1" /> Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;

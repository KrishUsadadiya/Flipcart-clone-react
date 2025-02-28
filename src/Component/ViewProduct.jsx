import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Container, Col, Card, Button } from "react-bootstrap";
import { addToCartAsync, getCartDataAsync, viewDataAsync } from "../services/Action/ProductAction";
import { auth } from "../config/firebase";

const ViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = auth.currentUser;
    const { viewData } = useSelector((state) => state.productReducer);

    useEffect(() => {
        dispatch(viewDataAsync(id));
    }, [dispatch, id]);

    const [count, setCount] = useState(1);

    const handleCount = (value) => {
        if (value === "add") {
            setCount(count + 1);
        } else if (count > 1) {
            setCount(count - 1);
        } else {
            alert("Count cannot be less than 1");
        }
    };

    const totalPrice = viewData.price * count;

    const handleAddToCart = () => {
        const data = { viewData, totalPrice, count };
        dispatch(addToCartAsync(data));
        dispatch(getCartDataAsync());
    };

    const login = () => {
        alert("Please login to add to cart");
        navigate("/login");
    };

    return (
        <section className="text-light py-5">
            <Container className="d-flex justify-content-center">
                <Card className="bg-white text-white p-4 rounded shadow-lg d-flex flex-md-row align-items-center">

                    <Col md={5} className="mb-4 mb-md-0">
                        <Card.Img variant="top" src={viewData.image} className="img-fluid rounded shadow-lg" alt="Product" />
                    </Col>

                    <Col md={7} className="ps-md-4">
                        <h2 className="text-dark mt-2">Product: {viewData.title}</h2>
                        <p className="text-dark fs-5"><strong>Price: </strong>${totalPrice}</p>
                        <p className="text-dark fs-6"><strong>Description: </strong>{viewData.description}</p>

                        <div className="d-flex align-items-center gap-3 mb-3">
                            <Button variant="light" className="rounded-circle p-2" onClick={() => handleCount("sub")}>-</Button>
                            <span className="text-dark fs-4">{count}</span>
                            <Button variant="light" className="rounded-circle p-2" onClick={() => handleCount("add")}>+</Button>
                        </div>
        
                        <div className="d-flex gap-3">
                            <Button variant="light" className="w-50" onClick={() => navigate("/")}>Go to Home</Button>
                            {user ? (
                                <Button variant="light" className="w-50" onClick={handleAddToCart}>Add to Cart</Button>
                            ) : (
                                <Button variant="light" className="w-50" onClick={login}>Add to Cart</Button>
                            )}
                        </div>
                    </Col>
                </Card>
            </Container>
        </section>
    );
};

export default ViewProduct;

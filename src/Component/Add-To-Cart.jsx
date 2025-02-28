import { useDispatch, useSelector } from "react-redux";
import { clearCartAsync, getCartDataAsync, removeFromCartAsync } from "../services/Action/ProductAction";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../config/firebase";
import { Table, Button, Container, Image } from "react-bootstrap";
import "./button.css"


const AddToCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartData = useSelector((state) => state.productReducer.cartData);
    const user = auth.currentUser;

    useEffect(() => {
        dispatch(getCartDataAsync());
    }, [dispatch]);

    const handleRemove = (itemId) => {
        if (!itemId) {
            console.error("Invalid item ID");
            return;
        }
        dispatch(removeFromCartAsync(itemId));
    };

    const handleOrder = () => {
        dispatch(clearCartAsync({ items: cartData }));
        navigate("/checkout");
    };

    const sumTotalPrice = cartData.reduce((sum, item) => sum + item.totalPrice, 0);

    return (
        <Container fluid>
            <h2 className="text-center mb-4">Shopping Cart</h2>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>IMG</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cartData?.length > 0 ? (
                        cartData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Image
                                        src={item?.viewData?.image || ""}
                                        alt={item?.viewData?.name || "Product Image"}
                                        width={50}
                                        height={50}
                                        rounded
                                    />
                                </td>
                                <td>{item?.viewData?.title || "N/A"}</td>
                                <td>${item?.viewData?.price?.toFixed(2) || "0.00"}</td>
                                <td>{item?.count || 0}</td>
                                <td>${(item?.totalPrice || 0).toFixed(2)}</td>
                                <td>
                                    {user ? (
                                        <Button variant="danger" className="button-24" onClick={() => handleRemove(item.id)}>
                                            Remove
                                        </Button>
                                    ) : (
                                        <Button className="button-29" onClick={() => navigate("/login")}>Login to Remove</Button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center text-muted py-3">
                                No items in the cart
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5" className="text-end fw-bold fs-5">Sub Total:</td>
                        <td className="fw-bold fs-5">${sumTotalPrice.toFixed(2)}</td>
                        <td>
                            {user ? (
                                <Button className="button-29" onClick={handleOrder}>Go to Checkout </Button>
                            ) : (
                                <Button className="button-29" onClick={() => navigate("/login")}>Login to Order</Button>
                            )}
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Container>
    );
};

export default AddToCart;
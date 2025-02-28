import { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Image, Button, Form, Row, Col, Alert } from "react-bootstrap";
import './button.css'


const Checkout = () => {
    const items = useSelector((state) => state.productReducer.items);
    const data = items.items || [];

    const [cardDetails, setCardDetails] = useState({
        name: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handleOrder = (e) => {
        e.preventDefault();

        if (!cardDetails.name || !cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
            alert("Please fill in all payment details.");
            return;
        }

        setOrderPlaced(true);
    };

    return (
        <section className="py-5">
            <Container className="text-light">
                <h1 className="text-center bg-secondary mb-4 py-3 rounded text-white">
                    Your Order: {data.length}
                </h1>

                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>IMG</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td>{index + 1}</td>
                                    <td>
                                        <Image
                                            src={item.viewData.image}
                                            alt="Product"
                                            width={50}
                                            height={50}
                                            className="object-cover"
                                        />
                                    </td>
                                    <td>{item.viewData.title}</td>
                                    <td>${item.viewData.price}</td>
                                    <td>{item.count}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted py-5">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {orderPlaced ? (
                    <Alert variant="success" className="text-center">
                        🎉 Your order has been placed successfully! Thank you for shopping with us. 😊
                    </Alert>
                ) : (
                    data.length > 0 && (
                        <Form onSubmit={handleOrder} className="bg-dark text-white p-4 rounded">
                            <h3 className="text-center mb-4">Enter Payment Details</h3>

                            <Form.Group className="mb-3">
                                <Form.Label>Name on Card</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={cardDetails.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardDetails.cardNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Expiry Date</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="expiry"
                                            placeholder="MM/YY"
                                            value={cardDetails.expiry}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cvv"
                                            placeholder="123"
                                            value={cardDetails.cvv}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="text-center">
                                <Button className="button-29" size="lg" type="submit">
                                    Order Now
                                </Button>
                            </div>
                        </Form>
                    )
                )}
            </Container>
        </section>
    );
};

export default Checkout;

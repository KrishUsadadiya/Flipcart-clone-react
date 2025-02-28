import { Container, Row, Col } from "react-bootstrap";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="py-4">
            <Container>
                <Row className="g-4 border-top">
                    {/* Company Info */}
                    <Col xs={12} sm={6} md={3}>
                        <h5>Flipkart Clone</h5>
                        <p>
                            The best place to shop for amazing deals on your favorite products.
                        </p>
                    </Col>

                    {/* Useful Links */}
                    <Col xs={12} sm={6} md={3}>
                        <h5>Useful Links</h5>
                        <ul className="list-unstyled ">
                            <li className="text-decoration-none">About Us</li>
                            <li className="text-decoration-none">Careers</li>
                            <li className="text-decoration-none">Privacy Policy</li>
                            <li className="text-decoration-none">Terms & Conditions</li>
                        </ul>
                    </Col>

                    {/* Customer Support */}
                    <Col xs={12} sm={6} md={3}>
                        <h5>Customer Support</h5>
                        <ul className="list-unstyled ">
                            <li className="text-decoration-none">Help Center</li>
                            <li className="text-decoration-none">Shipping & Delivery</li>
                            <li className="text-decoration-none">Returns & Refunds</li>
                            <li className="text-decoration-none">Contact Us</li>
                        </ul>
                    </Col>

                    {/* Social Media */}
                    <Col xs={12} sm={6} md={3}>
                        <h5>Follow Us</h5>
                        <div className="d-flex gap-3 mt-2">
                            <FiFacebook size={20} />
                            <FiTwitter size={20} />
                            <FiInstagram size={20} />
                            <FiLinkedin size={20} />
                        </div>
                    </Col>
                </Row>

                {/* Copyright Section */}
                <div className="text-center mt-4 border-top pt-3">
                    © {new Date().getDate()} Flipkart Clone. All rights reserved.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
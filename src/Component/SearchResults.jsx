import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const SearchResults = () => {
    const location = useLocation();
    const filteredProducts = location.state?.filteredProducts || [];

    return (
        <Container className="py-5">
            <h2 className="text-center text-light">Search Results</h2>
            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Card className="bg-secondary text-light w-100 h-100">
                                <Card.Img variant="top" src={product.image} width={100} height={250} alt={product.title} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>${product.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center text-light">No products found.</p>
                )}
            </Row>
        </Container>
    );
};

export default SearchResults;

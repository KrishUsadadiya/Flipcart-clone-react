import { Carousel, Container } from "react-bootstrap";

const Sliders = () => {
    return (
        <Container className="text-white py-4">
            <Carousel interval={2000} controls={false} indicators={true}>
                {/* Slide 1 */}
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded shadow-lg"
                        src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/7f3cde58a30f6024.jpg?q=20"
                        alt="Banner 1"
                    />
                </Carousel.Item>

                {/* Slide 2 */}
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded shadow-lg"
                        src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1ef81f497320ac22.jpeg?q=20"
                        alt="Banner 2"
                    />
                </Carousel.Item>

                {/* Slide 3 */}
                <Carousel.Item>
                    <img
                        className="d-block w-100 rounded shadow-lg"
                        src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/912c93218db5310a.jpeg?q=20"
                        alt="Banner 3"
                    />
                </Carousel.Item>
            </Carousel>
        </Container>
    );
};

export default Sliders;

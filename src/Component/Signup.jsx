import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupAsync } from "../services/Action/Auth";
import { Form, Button, Container, Card } from "react-bootstrap";
import "./button.css"


export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSignup } = useSelector(state => state.authReducer);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            alert("Password and Confirm Password do not match");
            return;
        } else {
            console.log("Name:", name, "Email:", email, "Password:", password);
            dispatch(signupAsync(email, password));
            setName("");
            setEmail("");
            setPassword("");
            setcPassword("");
        }
    };

    useEffect(() => {
        if (isSignup) {
            navigate("/login");
        }
    }, [isSignup, navigate]);

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <Card className="p-4 shadow rounded w-100" style={{ maxWidth: "400px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                value={cpassword}
                                onChange={(e) => setcPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit"  className="button-29 w-100">
                            Sign Up
                        </Button>
                    </Form>

                    <p className="text-center text-muted button-29 mt-3">
                        Already have an account? <Link to="/login" className="text-white">Login</Link>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
}

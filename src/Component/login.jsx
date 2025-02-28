import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginAsync } from "../services/Action/Auth";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import "./button.css"


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { isLogin, error } = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAsync(email, password));
    };

    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

    useEffect(() => {
        if (error) {
            alert(error.message.includes("auth/") ? "Invalid email or password" : error.message);
        }
    }, [error]);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '24rem' }} className="p-4 shadow">
                {error && (
                    <Alert variant="danger" className="text-center">
                        {error.message.includes("auth/") ? "Invalid email or password" : error.message}
                    </Alert>
                )}
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
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
                    <Button  type="submit" className="button-29 w-100">
                        Login
                    </Button>
                </Form>
                <p className="text-center text-muted button-29 mt-3">
                    Dont have an account? <Link className="text-white" to="/signup">Sign up</Link>
                </p>
            </Card>
        </Container>
    );
}

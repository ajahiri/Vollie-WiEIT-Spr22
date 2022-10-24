import { useState } from "react";
import { ToastContainer } from "react-bootstrap";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

interface errorProps {
    errorBody: string;
    isToastError: boolean;
}

/* Set isToastError to true for red error message or false for green success message*/

const ErrorMessage: React.FC<errorProps> = ({ errorBody, isToastError }) => {
    const [show, setShow] = useState(false);

    if (isToastError) {
        return (
            <Row>
                <Col xs={6}>
                    <ToastContainer className="p-3" position="bottom-end">
                        <Toast
                            onClose={() => setShow(false)}
                            show={show}
                            delay={3000}
                            autohide
                            bg="danger && text-white"
                        >
                            <Toast.Body>{errorBody}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Col>
                <Col xs={6}></Col>
            </Row>
        );
    } else {
        return (
            <Row>
                <Col xs={6}>
                    <ToastContainer className="p-3" position="bottom-end">
                        <Toast
                            onClose={() => setShow(false)}
                            show={show}
                            delay={3000}
                            autohide
                            bg="success && text-white"
                        >
                            <Toast.Body>{errorBody}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Col>
                <Col xs={6}></Col>
            </Row>
        );
    }
};

export default ErrorMessage;

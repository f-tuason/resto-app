// Import from Bootstrap 5
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col
          style={{
            textAlign: "center",
            paddingTop: "100px",
            paddingBottom: "100px",
          }}
        >
          Not Found
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;

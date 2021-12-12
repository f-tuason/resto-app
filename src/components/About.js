// In React v17, you do not need import React

// Import from Bootstrap 5
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2
            style={{ textAlign: "center", marginBottom: "30px", color: "blue" }}
          >
            Restaurant Application
          </h2>
          <div style={{ textAlign: "center" }}>
            <p>
              This is a sample restaurant application built in React,
              React-Redux and React-Router-Dom.
            </p>
            <p>
              You can pick from the items to order and it will transfer to the
              Cart.
            </p>
            <p>You can also update the items.</p>
            <p>
              You can add to Cart but in the default add, it will only add with
              a quantity of 1.
            </p>
            <p>
              You can also remove items from the Cart, and also you can clear
              all the Items in the Cart.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;

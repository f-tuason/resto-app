// Import from Bootstrap 5
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

// Import from images
import resto from "../images/resto.png";

// Import Link from react-router-dom
import { Link } from "react-router-dom";

export const MenuBar = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/about" style={{ textDecoration: "none", color: "white" }}>
            <img src={resto} alt="resto" width="40" />
            &nbsp; Tinoy's Restaurant
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MenuBar;

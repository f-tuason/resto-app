import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

// Import from Bootstrap 5
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

// Import from css
import "./MyMenu.css";

export const MyMenu = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <Navbar>
      <Container>
        <Navbar.Brand className="ms-auto">
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/add" style={{ textDecoration: "none" }}>
            Add Item
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/cart">
            <Button>
              Cart&nbsp;&nbsp;<Badge bg="secondary">{cart.length}</Badge>
            </Button>
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MyMenu;



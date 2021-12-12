// Import useeffect, starting with React 17 you do not need to declare import react
import { useState, useEffect } from "react";

// Import components from react-redux
import { useSelector, useDispatch } from "react-redux";

// Import from Bootstrap 5
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DisplayCart = () => {
  // State for Modal Dialog (Delete Item)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // State for Modal Dialog (Clear Cart)
  const [showClear, setShowClear] = useState(false);
  const handleCloseClear = () => setShowClear(false);
  const handleShowClear = () => setShowClear(true);

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  // Import variables from store
  const cart = useSelector((state) => state.cart);
  const cartSum = useSelector((state) => state.cartSum);

  // Declare dispatch
  const dispatch = useDispatch();

  // Function to call when "+" is clicked
  const triggerQuantityUp = (id) => {
    dispatch({ type: "CART_QUANTITY_PLUS", payload: id });
  };

  // Function to call when "-" is clicked
  const triggerQuantityDown = (id) => {
    dispatch({ type: "CART_QUANTITY_MINUS", payload: id });
  };

  // Function to call when "remove" is clicked
  const triggerRemove = (id, name) => {
    setName(name);
    setId(id);
    handleShow();
  };

  // Function to call to confirm remove individual item from cart
  const confirmRemoveItem = () => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
    handleClose();
  };

  // Function to call when "clear" is clicked
  const triggerClearCart = () => {
    handleShowClear();
  };

  // Function to call to confirm remove all cart items
  const confirmClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    handleCloseClear();
  };

  // Re-compute sum
  useEffect(() => {
    let sum = 0;
    cart.map((cartItem) => {
      sum = sum + parseInt(cartItem.totalPrice);
      return cartItem;
    });
    dispatch({ type: "SET_SUM", payload: sum });
  });

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Cart Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete {name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={confirmRemoveItem}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* I've made another duplicate of the Modal because its body is totally different from
          the first Modal (delete item)
      */}
      <Modal
        show={showClear}
        onHide={handleCloseClear}
        animation={false}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Clear Cart?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to clear the Cart?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClear}>
            No
          </Button>
          <Button variant="danger" onClick={confirmClearCart}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row>
          <Col className="pt-3 pb-3">
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: "100px" }}>
                You have no items in your cart
              </div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr align="center" valign="middle">
                    <th colSpan="2">Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Sub Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    return (
                      <tr key={item.id} align="center" valign="middle">
                        <td>
                          <img src={item.image} alt={item.name} width="50" />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>
                          <div>
                            {item.quantity > 1 && (
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => triggerQuantityDown(item.id)}
                              >
                                -
                              </Button>
                            )}
                            &nbsp;{item.quantity}&nbsp;
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => triggerQuantityUp(item.id)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td>{item.totalPrice}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => triggerRemove(item.id, item.name)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr align="center" valign="middle">
                    <td colSpan="4" style={{ textAlign: "right" }}>
                      <b>Total</b>
                    </td>
                    <td>{cartSum}</td>
                    <td>
                      <Button variant="danger" onClick={triggerClearCart}>
                        Clear
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DisplayCart;

// Import from react
import { useState } from "react";

// Import components from react-redux
import { useDispatch } from "react-redux";

// Import from react-router-dom
import { useHistory } from "react-router-dom";

// Import components from react-bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Import css
import "./DisplayItem.css";

const DisplayItem = ({ id, name, price, category, image }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Declare dispatch and history
  const dispatch = useDispatch();
  const history = useHistory();

  // Function to call when "order" is clicked
  const triggerOrder = (newItem) => {
    dispatch({ type: "ADD_CART_ITEM", payload: newItem });
  };

  // Function to call when "update" is clicked
  const triggerEdit = (id) => {
    dispatch({ type: "SET_UPDATED", payload: id });
    history.push("/update");
  };

  const triggerRemove = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
    setShow(false);
  };

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
          <Modal.Title>Delete Record?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete {name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={() => triggerRemove(id)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="item">
        <div className="image-container">
          <img
            className="image"
            src={image}
            alt={name}
            width="70px"
            height="70px"
          />
        </div>

        <div className="text-container">
          <div>
            <div style={{ textAlign: "center" }}>
              <b>{name}</b>
              <br />({category})
              <br />
              Php {price}
            </div>
            <div className="buttons">
              <div>
                <Button
                  variant="primary"
                  style={{ margin: "5px 5px 5px 5px" }}
                  onClick={() =>
                    triggerOrder({ id, name, price, category, image })
                  }
                >
                  Order
                </Button>
              </div>
              <div>
                <Button
                  variant="success"
                  style={{ margin: "5px 5px 5px 5px" }}
                  onClick={() => triggerEdit(id)}
                >
                  Edit
                </Button>
              </div>
              <div>
                <Button
                  variant="danger"
                  style={{ margin: "5px 5px 5px 5px" }}
                  onClick={handleShow}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayItem;

// Import usestate, starting with React 17, you do not need to import react
import { useState, useEffect } from "react";

// Import components from react-redux
import { useSelector, useDispatch } from "react-redux";

// Import uuidv4
import { v4 as uuidv4 } from "uuid";

// Import from Bootstrap 5
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Import css
import "./AddItem.css";

const AddItem = ({ purpose }) => {
  // Import list of categories from store
  const categories = useSelector((state) => state.categories);

  // Declare and initialize states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("1");
  const [category, setCategory] = useState("Food");
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState("");
  const [msgVisible, setMsgVisible] = useState(false);

  // Declare dispatch
  const dispatch = useDispatch();

  // Function for handling submit form
  const handleSubmit = (e) => {
    // prevent form from reloading
    e.preventDefault();

    // Set initial state for msg
    setMsg("");
    setMsgVisible(false);

    // Declare newitem
    let newItem = { id: uuidv4(), name, price, category, image };

    // Check for price if <= 0
    if (price <= 0) {
      setMsg(`Price: Invalid value!`);
      setMsgVisible(true);
      return;
    }

    // Call reducer with newitem
    dispatch({ type: "ADD_ITEM", payload: newItem });

    // Set msg to successful add
    setMsg(`"${name}" has been added to items`);
    setMsgVisible(true);

    // revert all states to initial value (to clear form)
    setName("");
    setPrice("1");
    setImage("");
  };

  useEffect(() => {
    // Set initial state for msg
    setMsg("");
    setMsgVisible(false);
  }, []);

  return (
    <Container>
      <Row className="addupdate">
        <Row>
          <Col
            className="pt-3 pb-3"
            style={{ textAlign: "center", color: "blue" }}
          >
            <h2>Add Item</h2>
          </Col>
        </Row>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Row>
            <Col className="pt-3" style={{ textAlign: "center" }}>
              <Form.Label htmlFor="name">Name</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Form.Control
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </Col>
          </Row>
          <Row>
            <Col className="pt-3" style={{ textAlign: "center" }}>
              <Form.Label htmlFor="price">Price</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Form.Control
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col className="pt-3" style={{ textAlign: "center" }}>
              <Form.Label htmlFor="category">Category</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories.map((cat) => {
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </Col>
          </Row>
          <Row>
            <Col className="pt-3" style={{ textAlign: "center" }}>
              <Form.Label htmlFor="image">Image</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Form.Control
                type="url"
                id="image"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col className="pt-4" style={{ textAlign: "center" }}>
              <Button type="submit">Add Item</Button>
            </Col>
          </Row>
          <Row>
            <Col className="pt-2" style={{ textAlign: "center" }}>
              {msgVisible && <p>{msg}</p>}
            </Col>
          </Row>
        </form>
      </Row>
    </Container>
  );
};

export default AddItem;

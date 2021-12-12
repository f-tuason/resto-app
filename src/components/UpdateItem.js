// Import from react
import { useState, useEffect } from "react";

// Import components from react-redux
import { useSelector, useDispatch } from "react-redux";

// Import components from Bootstrap 5
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Import user defined component
import NotFound from "./NotFound";

// Import css
import "./AddItem.css";

const UpdateItem = () => {
  // component states
  const categories = useSelector((state) => state.categories);
  const updateItem = useSelector((state) => state.updateItem);

  // Declare initial states
  const [name, setName] = useState(updateItem.name);
  const [price, setPrice] = useState(updateItem.price);
  const [category, setCategory] = useState(updateItem.category);
  const [image, setImage] = useState(updateItem.image);

  const [msg, setMsg] = useState("");
  const [msgVisible, setMsgVisible] = useState(false);

  // Declare dispatch
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    // prevent form from reloading
    e.preventDefault();

    // Set initial state for visibility and msg
    setMsg("");
    setMsgVisible(false);

    // create new item object
    let newItem = { id: updateItem.id, name, price, category, image };

    // Check for price if <= 0
    if (price <= 0) {
      setMsg(`Price: Invalid value!`);
      setMsgVisible(true);
      return;
    }

    // Call reducer if update, then also update cart item
    dispatch({ type: "UPDATE_ITEM", payload: newItem });
    dispatch({ type: "UPDATE_CART_ITEM", payload: newItem });

    // Update msg after update
    setMsg(`"${name}" has been updated`);
    setMsgVisible(true);
  };

  useEffect(() => {
    // Set initial state for msg
    setMsg("");
    setMsgVisible(false);
  }, []);

  return (
    <>
      {updateItem ? (
        <Container>
          <Row className="addupdate">
            <Row>
              <Col
                className="pt-3 pb-3"
                style={{ textAlign: "center", color: "blue" }}
              >
                <h2>Update Item</h2>
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
                  <Button type="submit">Update</Button>
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
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default UpdateItem;

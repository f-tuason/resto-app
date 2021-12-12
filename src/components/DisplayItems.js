// Import from react
import { useState, useEffect } from "react";

// Import from react-redux
import { useSelector, useDispatch } from "react-redux";

// Import from react-beautiful-dnd
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Import from Bootstrap 5
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Import user components
import DisplayItem from "./DisplayItem";
import ItemSelect from "./ItemSelect";

// Import css
import "./DisplayItems.css";

const DisplayItems = () => {
  // Get variables from store
  const items = useSelector((state) => state.items);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // Declare state
  const [filteredItems, setFilteredItems] = useState([]);

  // Filter items based on select list
  useEffect(() => {
    setFilteredItems(
      items.filter((item) => {
        if (category.toLowerCase() === "all") {
          return item;
        }
        if (item.category.toLowerCase() === category.toLowerCase()) {
          return item;
        }
        return null;
      })
    );
  }, [category, items]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const ditems = Array.from(filteredItems);
    const [reorderedItem] = ditems.splice(result.source.index, 1);
    ditems.splice(result.destination.index, 0, reorderedItem);

    if (category === "All") {
      dispatch({ type: "DND_ITEMS", payload: ditems });
    }
  };

  return (
    <Container>
      {filteredItems.length === 0 ? (
        <Row>
          <Col className="pt-5">
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              You have no items
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col className="pt-3 pb-3">
              <ItemSelect />
            </Col>
          </Row>
          <Row>
            <Col>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                  {(provided) => (
                    <ul
                      className="item-data-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {filteredItems.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                className="todos"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <DisplayItem {...item} />
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default DisplayItems;

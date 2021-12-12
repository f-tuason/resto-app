// Import components from react-redux
import { useSelector, useDispatch } from "react-redux";

// Import css
import "./ItemSelect.css";

const ItemSelect = () => {
  // Import variables from store
  const category_1 = useSelector((state) => state.category);
  const categories = useSelector((state) => state.categories);

  // Declare dispatch
  const dispatch = useDispatch();

  // Function to call when selecting from categories list
  const triggerCategory = (newValue) => {
    dispatch({ type: "CHANGE_CATEGORY", payload: newValue });
  };

  return (
    <div className="item-select">
      <select
        className="select-css"
        value={category_1}
        onChange={(e) => {
          triggerCategory(e.target.value);
        }}
      >
        <option value={"All"}>All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemSelect;



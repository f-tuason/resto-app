const initialState = {
  // start of initial state
  items: [
    {
      id: "73f52540-5706-4987-bbdc-c642e854b166",
      name: "Burger",
      price: 50,
      category: "Food",
      image: "https://img.icons8.com/office/100/000000/kawaii-pizza.png",
    },
    {
      id: "f1868549-b7c4-4db5-adc8-e8a558209b49",
      name: "Pizza",
      price: 100,
      category: "Food",
      image: "https://img.icons8.com/office/100/000000/coffee--v1.png",
    },
    {
      id: "0f5b5225-e589-44d8-a2f2-55a3aca2db13",
      name: "Fries",
      price: 25,
      category: "Food",
      image: "https://img.icons8.com/office/100/000000/french-fries.png",
    },
    {
      id: "a7798fae-834d-45f9-8c1b-db7ab6dc29e2",
      name: "Coffee",
      price: 35,
      category: "Drink",
      image: "https://img.icons8.com/office/100/000000/coffee-pot.png",
    },
    {
      id: "c8852e0f-6c46-4b56-9f86-ae07a7f52a82",
      name: "Iced Tea",
      price: 45,
      category: "Drink",
      image: "https://img.icons8.com/office/100/000000/hamburger.png",
    },
    {
      id: "4c249ec2-8796-4ff2-b634-5cb581ab8323",
      name: "Hot Tea",
      price: 45,
      category: "Dessert",
      image: "https://img.icons8.com/office/100/000000/kawaii-ice-cream.png",
    },
  ],
  cart: [],
  cartSum: 0,
  updateItem: {},
  category: "All",
  categories: ["Food", "Drink", "Dessert"],
  // end of initial state
};

const reducer = (state = initialState, action) => {
  /*
    action {
      type: ALWAYS CAPITALIZED, NO SPACE,
      payload:,
    }
  */

  switch (action.type) {
    // reducer functions
    case "CHANGE_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_SUM":
      return { ...state, cartSum: parseInt(action.payload) };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "ADD_CART_ITEM":
      if (state.cart.find((cartItem) => cartItem.id === action.payload.id)) {
        return {
          ...state,
          cart: state.cart.map((cartItem) => {
            if (cartItem.id === action.payload.id) {
              cartItem.quantity += 1;
              cartItem.totalPrice =
                parseInt(cartItem.quantity) * parseInt(cartItem.price);
            }
            return cartItem;
          }),
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload,
              quantity: 1,
              totalPrice: parseInt(action.payload.price),
            },
          ],
        };
      }
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            item = { ...item, ...action.payload };
            item.totalPrice = parseInt(item.quantity) * parseInt(item.price);
          }
          return item;
        }),
      };
    case "CART_QUANTITY_PLUS":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem.id === action.payload) {
            cartItem.quantity += 1;
            cartItem.totalPrice =
              parseInt(cartItem.quantity) * parseInt(cartItem.price);
          }
          return cartItem;
        }),
      };
    case "CART_QUANTITY_MINUS":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem.id === action.payload) {
            cartItem.quantity -= 1;
            cartItem.totalPrice =
              parseInt(cartItem.quantity) * parseInt(cartItem.price);
          }
          return cartItem;
        }),
      };
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            item = { ...action.payload };
          }
          return item;
        }),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "SET_UPDATED":
      return {
        ...state,
        updateItem: state.items.find((item) => {
          if (item.id === action.payload) {
            return item;
          }
          return null;
        }),
      };
    case "SET_FOUND_ITEM":
      return {
        ...state,
        updateItem: action.payload,
      };
    case "DND_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    // default function which returns state
    default:
      return state;
  }
};

export default reducer;

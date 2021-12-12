// Import components from react-router-dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import user components
import NavBar from "./components/MenuBar";
import AddItem from "./components/AddItem";
import DisplayCart from "./components/DisplayCart";
import DisplayItems from "./components/DisplayItems";
import UpdateItem from "./components/UpdateItem";
import MyMenu from "./components/MyMenu";
import NotFound from "./components/NotFound";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <NavBar />
      <MyMenu />
      <Switch>
        <Route exact path="/">
          <DisplayItems />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/cart">
          <DisplayCart />
        </Route>
        <Route path="/add">
          <AddItem />
        </Route>
        <Route path="/update">
          <UpdateItem />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

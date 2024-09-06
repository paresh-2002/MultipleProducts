import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Fetchitems from "../components/Fetchitems";
import UserForm from "../components/UserForm";
import Home from "./Home";
import Card from "./Card";
import AddItem from "../components/AddItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route
              path="/users/sign_in"
              element={<UserForm isSignInPage={true} />}
            />
            <Route
              path="/users/sign_up"
              element={<UserForm isSignInPage={false} />}
            />
            <Route
              index
              element={
                <>
                  <Navbar />
                  <Home />
                  <Fetchitems />
                  <Footer />
                </>
              }
            />
            <Route
              path="/orders"
              element={
                  <>
                  <Navbar />
                  <Card />
                  <Footer />
                  </>
              }
            />
            <Route
              path="/add_item"
              element={
                <>
                  <Navbar />
                  <AddItem />
                  <Footer />
                </>
              }
            />
          </Route>
          {/* Redirect to home if route not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

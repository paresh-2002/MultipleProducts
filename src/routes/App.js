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
import AdminDashboard from "../components/admin/AdminDashboard";
import UserDashboard from "../components/user/UserDashboard";
import { useSelector } from "react-redux";
import ProductInfo from "../components/ProductInfo";
import { ProtectedRouteForAdmin } from "../components/admin/protectedRoute/ProtectedRouteForAdmin";
import { ProtectedRouteForUser } from "../components/admin/protectedRoute/ProtectedRouteForUser";
import HeroSection from "../components/heroSection/HeroSection";

// const RequireAuth = ({ children }) => {
//   const currentUser = useSelector((state) => state.user.currentUser);
//   return currentUser ? children : <Navigate to="/users/sign-in" />;
// };

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route
              path="/users/sign-in"
              element={<UserForm isSignInPage={true} />}
            />
            <Route
              path="/users/sign-up"
              element={<UserForm isSignInPage={false} />}
            />
            <Route
              index
              element={
                <>
                  <Navbar />
                  <HeroSection />
                  <Fetchitems />
                  <Footer />
                </>
              }
            />
            <Route
              path="all-products"
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
              path="/add-item"
              element={
                <>
                  <Navbar />
                  <AddItem />
                  <Footer />
                </>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <>
                  <ProtectedRouteForAdmin>
                  <Navbar />
                  <AdminDashboard />
                  <Footer />
                  </ProtectedRouteForAdmin>
                </>
              }
            />
            <Route
              path="/user-dashboard"
              element={
                <>
                  <ProtectedRouteForUser>
                  <Navbar />
                    <UserDashboard />
                  <Footer />
                  </ProtectedRouteForUser>
                </>
              }
            />
            <Route
              path="/productInfo/:id"
              element={
                <>
                  <Navbar />
                    <ProductInfo/>
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

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserForm from "../components/UserForm";
import Home from "./Home";
import Card from "./Card";
import AddItem from "../components/AddItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminDashboard from "../components/admin/AdminDashboard";
import UserDashboard from "../components/user/UserDashboard";
import ProductInfo from "../components/ProductInfo";
import { ProtectedRouteForAdmin } from "../components/admin/protectedRoute/ProtectedRouteForAdmin";
import { ProtectedRouteForUser } from "../components/admin/protectedRoute/ProtectedRouteForUser";
import HeroSection from "../components/heroSection/HeroSection";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return currentUser ? children : <Navigate to="/users/sign-in" />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          
            <Route
              path="/users/sign-in"
              element={<UserForm isSignInPage={true} />}
            />
            <Route
              path="/users/sign-up"
              element={<UserForm isSignInPage={false} />}
            />
            <Route path="/"
              element={
                <RequireAuth>
                  <Navbar />
                  <HeroSection />
                  <Footer />
                </RequireAuth>
              }/>
            
            <Route
              path="/all-products"
              element={
                <RequireAuth>
                  <Navbar />
                  <Home />
                  <Footer />
                </RequireAuth>
              }
            />
            <Route
              path="/orders"
              element={
                <RequireAuth>
                  <Navbar />
                  <Card />
                  <Footer />
                </RequireAuth>
              }
            />
            <Route
              path="/add-item"
              element={
                <RequireAuth>
                  <Navbar />
                  <AddItem />
                  <Footer />
                </RequireAuth>
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
                  <ProductInfo />
                  <Footer />
                </>
              }
            />
          {/* Redirect to home if route not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

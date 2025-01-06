import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { ref as dbRef, set } from "firebase/database";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../store/userSlice";
import LoadingSpinner from "./LoadingSpinner";

const errorMessages = {
  "auth/email-already-in-use": "The email address is already in use.",
  "auth/invalid-email": "The email address is invalid.",
  "auth/wrong-password": "The password is incorrect.",
};

const UserForm = ({ isSignInPage = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    ...(isSignInPage ? {} : { name: "" }),
    email: "",
    password: "",
    role: "user",
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role, date } = data;

    setLoading(true);
    setError(""); // Reset error state

    try {
      if (isSignInPage) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        if (user) {
          dispatch(fetchUserData({ uid: user.uid, email: user.email, role }));
        }
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        if (user) {
          await set(dbRef(db, `userData/${user.uid}`), {
            ...data,
            uid: user.uid,
          });
          toast.success("Account Created Successfully");
          navigate("/users/sign_in");
          setData({ name: "", email: "", password: "", role, date });
        }
      }
    } catch (error) {
      console.error("Authentication Error:", error.code, error.message);
      setError(
        errorMessages[error.code] || "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[400px] shadow-lg rounded-md p-5 flex flex-col">
        <div className="">
          <img
            src="/Images/card.png"
            alt=""
            width="80"
            height="80"
            className="m-auto"
          />
        </div>
        <h2 className="text-center font-medium text-3xl mb-2">
          {isSignInPage ? "Sign In" : "Sign Up"}
        </h2>
        <form
          className="w-full flex flex-1 flex-col m-auto"
          method="POST"
          onSubmit={handleSubmit}
        >
          {!isSignInPage && (
            <input
              type="text"
              placeholder="Name"
              value={data.name}
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="form-control mb-3"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="form-control mb-3"
          />
          <div className="flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="form-control mb-3"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-3 cursor-pointer"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            className="text-decoration-none flex justify-center p-2 rounded-md w-full self-center bg-cyan-800 text-white hover:bg-cyan-900 mt-12"
            type="submit"
            disabled={loading}
          >
            <span>
              {loading ? <LoadingSpinner /> : isSignInPage ? "Sign In" : "Sign Up"}
            </span>
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </form>
        <p className="text-sm text-center mt-2">
          {isSignInPage ? "New account?" : "Already have an account?"}
          <Link to={`/users/${isSignInPage ? "sign-up" : "sign-in"}`}>
            <span className="text-blue-500 underline cursor-pointer pl-2">
              {isSignInPage ? "Sign Up" : "Sign In"}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserForm;
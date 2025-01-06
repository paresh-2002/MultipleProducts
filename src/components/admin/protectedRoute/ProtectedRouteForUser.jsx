/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const ProtectedRouteForUser = ({ children }) => {
  const user = useSelector((state) => state.user.currentUser);

  if (user?.role === "user") {
    return children;
  } else {
    return <Navigate to={"/users/sign_in"} />;
  }
};

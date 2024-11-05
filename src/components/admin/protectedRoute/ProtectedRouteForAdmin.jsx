/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router"

export const ProtectedRouteForAdmin = ({children}) => {
    // const user = JSON.parse(localStorage.getItem('users'))
    const user  = useSelector((state) => state.user.currentUser);
    if (user?.role === "admin") {
      return children
    }
    else {
      return <Navigate to={'/users/sign_in'}/>
    }
}
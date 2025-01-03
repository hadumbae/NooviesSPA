import {FC} from 'react';
import Cookies from "js-cookie";
import {Outlet, Navigate} from "react-router-dom";

const AuthGuard: FC = () => {
    const hasAuth = Cookies.get("hasAuthToken");

    return (hasAuth ? <Outlet /> : <Navigate to="/auth/login" />);
};

export default AuthGuard;

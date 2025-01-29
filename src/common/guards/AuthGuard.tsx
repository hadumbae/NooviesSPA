import {FC} from 'react';
import Cookies from "js-cookie";
import {Outlet, Navigate} from "react-router-dom";
import useSetRedirectPath from "@/common/hooks/routing/useSetRedirectPath.ts";

const AuthGuard: FC = () => {
    const hasAuth = Cookies.get("hasAuthToken");
    if (!hasAuth) useSetRedirectPath();

    return (hasAuth ? <Outlet /> : <Navigate to="/auth/login" />);
};

export default AuthGuard;

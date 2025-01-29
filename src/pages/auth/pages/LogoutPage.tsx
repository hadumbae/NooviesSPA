import {FC} from 'react';
import useAuthLogoutSubmitMutation from "@/pages/auth/hooks/useAuthLogoutSubmitMutation.ts";
import {Navigate} from "react-router-dom";

const LogoutPage: FC = () => {
    useAuthLogoutSubmitMutation();
    return <Navigate to="/" />;
};

export default LogoutPage;

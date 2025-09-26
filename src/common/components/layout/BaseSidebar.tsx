import {FC, useContext} from 'react';
import Cookies from "js-cookie";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import GuestSidebar from "@/common/components/sidebar/GuestSidebar.tsx";
import AdminSidebar from "@/common/components/sidebar/AdminSidebar.tsx";
import ClientSidebar from "@/common/components/sidebar/ClientSidebar.tsx";

const BaseSidebar: FC = () => {
    const isAuthenticated = Cookies.get("hasAuthToken");
    const authContext = useContext(AuthContext);

    if (isAuthenticated && authContext) {
        const {isAdmin = false} = authContext.user || {};
        return isAdmin ? <AdminSidebar /> : <ClientSidebar />;
    }

    return (
        <GuestSidebar />
    );
};

export default BaseSidebar;

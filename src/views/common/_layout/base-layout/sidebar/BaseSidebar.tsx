import {FC} from 'react';
import {AuthContext} from "@/domains/auth/_feat/manage-auth-user-data/context/AuthContext.ts";
import GuestSidebar from "@/views/common/_layout/base-layout/sidebar/guest-side-bar/GuestSidebar.tsx";
import ClientSidebar from "@/views/common/_layout/base-layout/sidebar/client-side-bar/ClientSidebar.tsx";
import {useAuthContext} from "@/domains/auth";

/**
 * Application sidebar switch.
 *
 * @remarks
 * Rendering:
 * - Guest → {@link GuestSidebar}
 * - Authenticated user → {@link ClientSidebar}
 *
 * Requires {@link AuthContext}.
 */
const BaseSidebar: FC = () => {
    const {user} = useAuthContext();
    return user ? <ClientSidebar/> : <GuestSidebar/>;
};

export default BaseSidebar;

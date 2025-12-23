import {FC} from 'react';
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import GuestSidebar from "@/common/layout/base-layout/sidebar/guest-side-bar/GuestSidebar.tsx";
import ClientSidebar from "@/common/layout/base-layout/sidebar/client-side-bar/ClientSidebar.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

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
    const {user} = useRequiredContext({context: AuthContext});
    return user ? <ClientSidebar /> : <GuestSidebar />;
};

export default BaseSidebar;

import {FC} from 'react';
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import GuestSidebar from "@/common/layout/base-layout/sidebar/guest-side-bar/GuestSidebar.tsx";
import AdminSidebar from "@/common/layout/base-layout/sidebar/admin-side-bar/AdminSidebar.tsx";
import ClientSidebar from "@/common/layout/base-layout/sidebar/client-side-bar/ClientSidebar.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

/**
 * Base sidebar switch for the application layout.
 *
 * Selects and renders the appropriate sidebar based on the current
 * authentication and authorization state.
 *
 * @remarks
 * Rendering logic:
 * - Guest → {@link GuestSidebar}
 * - Authenticated admin → {@link AdminSidebar}
 * - Authenticated non-admin → {@link ClientSidebar}
 *
 * This component:
 * - Requires {@link AuthContext} to be available
 * - Assumes authorization (`isAdmin`) is derived from the authenticated user
 * - Does not handle mobile or responsive sidebar variants
 */
const BaseSidebar: FC = () => {
    /**
     * Auth state retrieved from {@link AuthContext}.
     *
     * @remarks
     * `useRequiredContext` guarantees a defined context value.
     */
    const {user, isAdmin} = useRequiredContext({context: AuthContext});

    // --- GUEST ---
    if (!user) {
        return <GuestSidebar />;
    }

    // --- ADMIN ---
    if (isAdmin) {
        return <AdminSidebar />;
    }

    // --- CLIENT ---
    return <ClientSidebar />;
};

export default BaseSidebar;

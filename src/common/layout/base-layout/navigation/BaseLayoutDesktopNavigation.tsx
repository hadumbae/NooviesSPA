import {FC} from 'react';
import BaseLayoutDesktopAdminNavigation
    from "@/common/layout/base-layout/navigation/desktop-admin-navigation/BaseLayoutDesktopAdminNavigation.tsx";
import BaseLayoutDesktopGuestNavigation
    from "@/common/layout/base-layout/navigation/desktop-guest-navigation/BaseLayoutDesktopGuestNavigation.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import BaseLayoutDesktopClientNavigation
    from "@/common/layout/base-layout/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";

/**
 * Desktop navigation switch for the base layout.
 *
 * Selects and renders the appropriate desktop navigation component
 * based on the current authentication and authorization state.
 *
 * @remarks
 * Rendering logic:
 * - Guest → {@link BaseLayoutDesktopGuestNavigation}
 * - Authenticated admin → {@link BaseLayoutDesktopAdminNavigation}
 * - Authenticated non-admin → {@link BaseLayoutDesktopClientNavigation}
 *
 * This component:
 * - Requires {@link AuthContext} to be available
 * - Does not handle mobile navigation
 */
const BaseLayoutDesktopNavigation: FC = () => {
    /**
     * Auth state retrieved from {@link AuthContext}.
     *
     * @remarks
     * `useRequiredContext` guarantees a defined context value.
     */
    const {user, isAdmin} = useRequiredContext({context: AuthContext});

    // --- GUEST ---

    if (!user) {
        return <BaseLayoutDesktopGuestNavigation />;
    }

    // --- ADMIN ---

    if (isAdmin) {
        return <BaseLayoutDesktopAdminNavigation />;
    }

    // --- CLIENT ---

    return <BaseLayoutDesktopClientNavigation />;
};

export default BaseLayoutDesktopNavigation;

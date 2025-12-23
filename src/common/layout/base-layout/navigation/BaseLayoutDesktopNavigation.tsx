import {FC} from 'react';
import BaseLayoutDesktopGuestNavigation
    from "@/common/layout/base-layout/navigation/desktop-guest-navigation/BaseLayoutDesktopGuestNavigation.tsx";
import BaseLayoutDesktopClientNavigation
    from "@/common/layout/base-layout/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";

/**
 * Desktop navigation switch for the base layout.
 *
 * @remarks
 * Rendering:
 * - Guest → {@link BaseLayoutDesktopGuestNavigation}
 * - Authenticated user → {@link BaseLayoutDesktopClientNavigation}
 *
 * Requires {@link AuthContext}.
 */
const BaseLayoutDesktopNavigation: FC = () => {
    const {user} = useRequiredContext({context: AuthContext});

    return user
        ? <BaseLayoutDesktopClientNavigation />
        : <BaseLayoutDesktopGuestNavigation />;
};

export default BaseLayoutDesktopNavigation;

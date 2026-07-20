import {FC} from 'react';
import {
    BaseLayoutDesktopGuestNavigation
} from "@/views/common/_layout/base-layout/navigation/desktop-guest-navigation/BaseLayoutDesktopGuestNavigation.tsx";
import {
    BaseLayoutDesktopClientNavigation
} from "@/views/common/_layout/client/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";
import {AuthContext} from "@/domains/auth/_feat/manage-auth-user-data/context/AuthContext.ts";
import {useAuthContext} from "@/domains/auth";

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
    const {user} = useAuthContext();

    return user
        ? <BaseLayoutDesktopClientNavigation/>
        : <BaseLayoutDesktopGuestNavigation/>;
};

export default BaseLayoutDesktopNavigation;

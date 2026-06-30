/**
 * @fileoverview Desktop navigation component for unauthenticated users.
 */

import {ReactElement} from 'react';
import NavLink from "@/common/components/navigation/NavLink.tsx";
import {SROnly} from "@/views/common/_comp";

/**
 * Renders the desktop navigation links for guest users.
 */
export function BaseLayoutDesktopGuestNavigation(): ReactElement {
    return (
        <section className="flex items-center space-x-4 font-spaceGrotesk">
            <SROnly text="Desktop Navigation"/>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/auth/register">Register</NavLink>
            <NavLink to="/auth/login">Login</NavLink>
        </section>
    );
}

/**
 * @fileoverview Desktop navigation component for unauthenticated users.
 */

import {ReactElement} from 'react';
import {LayoutNavLink} from "@/views/common/_comp/layout/LayoutNavLink.tsx";
import {SROnly} from "@/views/common/_comp";

/**
 * Renders the desktop navigation links for guest users.
 */
export function BaseLayoutDesktopGuestNavigation(): ReactElement {
    return (
        <section className="flex items-center space-x-4 font-spaceGrotesk">
            <SROnly text="Desktop Navigation"/>
            <LayoutNavLink to="/">Home</LayoutNavLink>
            <LayoutNavLink to="/auth/register">Register</LayoutNavLink>
            <LayoutNavLink to="/auth/login">Login</LayoutNavLink>
        </section>
    );
}

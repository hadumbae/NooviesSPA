import {FC} from 'react';
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import NavLink from "@/common/components/navigation/NavLink.tsx";

/**
 * **BaseLayoutDesktopGuestNavigation**
 *
 * Desktop navigation component for **unauthenticated (guest) users**.
 *
 * ### Features
 * - Provides basic navigation links for guests:
 *   - Home (`/`)
 *   - Register (`/auth/register`)
 *   - Login (`/auth/login`)
 * - Includes a visually-hidden section header for accessibility.
 *
 * ### Usage
 * Use this component when rendering the desktop navigation for users
 * who are not logged in.
 *
 * @returns {JSX.Element} The desktop navigation section for guest users
 */
const BaseLayoutDesktopGuestNavigation: FC = () => {
    return (
        <section className="flex items-center space-x-4">
            {/** Hidden section header for accessibility */}
            <SectionHeader srOnly={true}>Desktop Navigation</SectionHeader>

            {/** Guest navigation links */}
            <NavLink to="/">Home</NavLink>
            <NavLink to="/auth/register">Register</NavLink>
            <NavLink to="/auth/login">Login</NavLink>
        </section>
    );
};

export default BaseLayoutDesktopGuestNavigation;

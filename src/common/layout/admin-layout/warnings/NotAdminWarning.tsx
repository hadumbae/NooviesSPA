/**
 * @file NotAdminWarning.tsx
 *
 * Guard component for admin-only routes.
 *
 * Displays a contextual warning when:
 * - The user is not authenticated
 * - The user is authenticated but lacks admin privileges
 *
 * Persists the current route for post-auth redirection.
 */

import {User} from "@/pages/users/schemas/user/User.types.ts";
import {AlertTriangle} from "lucide-react";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import HoverLink from "@/common/components/navigation/HoverLink.tsx";
import {useLocation} from "react-router-dom";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for {@link NotAdminWarning}.
 */
type WarningProps = {
    /** Current authenticated user (or null if unauthenticated). */
    user: User | null;

    /** Whether the user has admin privileges. */
    isAdmin: boolean;
};

/** Warning icon size in pixels */
const ICON_SIZE = 75;

/** Layout wrapper for warning content */
const SECTION_CSS = "flex flex-col items-center space-y-1";

/** Header text styling */
const TEXT_CSS = "pt-5 uppercase select-none";

/** Link text styling */
const LINK_CSS = "uppercase";

/**
 * Admin access warning component.
 *
 * - Redirects unauthenticated users to login
 * - Prevents non-admin users from accessing restricted routes
 * - Stores the attempted route for post-login redirect
 *
 * @component
 */
const NotAdminWarning = ({user, isAdmin}: WarningProps) => {
    const {pathname, search, hash} = useLocation();
    const path = `${pathname}${search}${hash}`;

    sessionStorage.setItem("redirectPath", path);

    if (!user) {
        return (
            <section className={SECTION_CSS}>
                <AlertTriangle
                    size={ICON_SIZE}
                    className={PrimaryTextBaseCSS}
                />
                <PrimaryHeaderText className={TEXT_CSS}>
                    You Must Be Logged In
                </PrimaryHeaderText>
                <HoverLink to="/auth/login" className={LINK_CSS}>
                    Log In
                </HoverLink>
            </section>
        );
    }

    if (!isAdmin) {
        return (
            <section className={SECTION_CSS}>
                <AlertTriangle
                    size={ICON_SIZE}
                    className={PrimaryTextBaseCSS}
                />
                <PrimaryHeaderText className={TEXT_CSS}>
                    Restricted To Admins
                </PrimaryHeaderText>
                <HoverLink to="/" className={LINK_CSS}>
                    Home
                </HoverLink>
            </section>
        );
    }

    return null;
};

export default NotAdminWarning;

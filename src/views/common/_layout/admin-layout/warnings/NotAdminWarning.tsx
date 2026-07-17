/**
 * @fileoverview Warning component displayed when a user lacks administrative privileges or is not logged in.
 */

import {ReactElement} from "react";
import {AlertTriangle} from "lucide-react";
import HoverLink from "@/common/components/navigation/HoverLink.tsx";
import {useLocation} from "react-router-dom";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {User} from "@/domains/users";

/** Config for the NotAdminWarning component. */
const alertConfig = {
    icon: 75,
    section: "flex flex-col items-center space-y-1",
    text: "pt-5 uppercase select-none",
    link: "uppercase",
}

/** Props for the NotAdminWarning component. */
type WarningProps = {
    user: User | null;
    isAdmin: boolean;
};

/** Displays a warning message and navigation links for unauthorised users or guests. */
export function NotAdminWarning(
    {user, isAdmin}: WarningProps
): ReactElement | null {
    const {pathname, search, hash} = useLocation();
    const path = `${pathname}${search}${hash}`;

    sessionStorage.setItem("redirectPath", path);

    if (!user) {
        return (
            <section className={alertConfig.section}>
                <AlertTriangle size={alertConfig.icon} className="primary-text"/>
                <h2 className={cn("section-title", alertConfig.text)}>You Must Be Logged In</h2>
                <HoverLink to="/auth/login" className={alertConfig.link}>Log In</HoverLink>
            </section>
        );
    }

    if (!isAdmin) {
        return (
            <section className={alertConfig.section}>
                <AlertTriangle size={alertConfig.icon} className="primary-text"/>
                <h2 className={cn("section-title", alertConfig.text)}>Restricted To Admins</h2>
                <HoverLink to="/" className={alertConfig.link}>Home</HoverLink>
            </section>
        );
    }

    return null;
}

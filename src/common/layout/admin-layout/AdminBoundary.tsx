/**
 * @file AdminBoundary.tsx
 *
 * Access boundary for admin-only routes.
 *
 * Prevents rendering of protected content when the
 * current user is unauthenticated or lacks admin rights.
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import NotAdminWarning from "@/common/layout/admin-layout/warnings/NotAdminWarning.tsx";
import {ReactNode} from "react";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";

/**
 * Props for {@link AdminBoundary}.
 */
type BoundaryProps = {
    /** Protected content */
    children: ReactNode;
};

/**
 * Admin access boundary component.
 *
 * - Requires an authenticated admin user
 * - Renders {@link NotAdminWarning} when access is denied
 * - Otherwise renders protected children
 *
 * @component
 */
const AdminBoundary = ({children}: BoundaryProps) => {
    const {user, isAdmin} = useRequiredContext({context: AuthContext});

    if (!user || !isAdmin) {
        return (
            <PageFlexWrapper className="justify-center items-center">
                <NotAdminWarning user={user} isAdmin={isAdmin} />
            </PageFlexWrapper>
        );
    }

    return children;
};

export default AdminBoundary;

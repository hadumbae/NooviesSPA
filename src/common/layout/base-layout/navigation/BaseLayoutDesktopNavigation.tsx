import {FC} from 'react';
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useAuthLogoutSubmitMutation from "@/pages/auth/hooks/useAuthLogoutSubmitMutation.ts";
import {Button} from "@/common/components/ui/button.tsx";
import NavLink from "@/common/components/navigation/NavLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import BaseLayoutSetupNavigation from "@/common/layout/base-layout/navigation/BaseLayoutSetupNavigation.tsx";
import BaseLayoutMovieNavigation from "@/common/layout/base-layout/navigation/BaseLayoutMovieNavigation.tsx";

/**
 * @fileoverview
 * Renders the desktop navigation section for the application's base layout.
 *
 * Includes links to key admin pages such as the Dashboard and Setup menu,
 * as well as a logout button. This component is designed for desktop viewports
 * and provides structured, accessible navigation for authenticated users.
 *
 * @component
 * @example
 * ```tsx
 * <BaseLayoutDesktopNavigation />
 * ```
 *
 * @remarks
 * - Uses {@link useLoggedNavigate} to perform navigation with logging metadata.
 * - Triggers logout via {@link useAuthLogoutSubmitMutation}, which runs the `onLogout`
 *   callback on success.
 * - Integrates {@link BaseLayoutSetupNavigation} to provide a dropdown for setup-related routes.
 *
 * @dependencies
 * - {@link SectionHeader} — visually hidden header for screen reader accessibility.
 * - {@link NavLink} — handles internal navigation links.
 * - {@link Button} — UI component for actions (logout).
 * - {@link cn} — utility for conditional class name concatenation.
 *
 * @returns {JSX.Element} The rendered desktop navigation section.
 */

const BaseLayoutDesktopNavigation: FC = () => {
    const navigate = useLoggedNavigate();

    const onLogout = () => navigate({to: "/", component: BaseLayoutDesktopNavigation.name});
    const {mutate} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    return (
        <section className={cn(
            "flex items-center",
        )}>
            <SectionHeader srOnly={true}>Desktop Navigation</SectionHeader>

            <NavLink to="/">
                Dashboard
            </NavLink>

            <BaseLayoutSetupNavigation />

            <BaseLayoutMovieNavigation />

            <Button
                variant="link"
                size="sm"
                className="text-neutral-400 hover:text-black"
                onClick={() => mutate()}
            >
                Log Out
            </Button>
        </section>
    );
};

export default BaseLayoutDesktopNavigation;

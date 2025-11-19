import {FC} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {ChevronDown} from "lucide-react";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import {cn} from "@/common/lib/utils.ts";
import DropdownMenuLink from "@/common/components/navigation/DropdownMenuLink.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";

/**
 * **BaseLayoutSetupNavigation** — a dropdown navigation component
 * for accessing setup-related admin pages such as genres, persons,
 * role types, and theatres.
 *
 * The component visually indicates whether the user is currently
 * on one of the setup-related routes by applying an inactive color
 * when none of the setup paths match the current URL.
 *
 * ### Behavior
 * - Displays a “Setup” button with a dropdown icon (`ChevronDown`).
 * - Expands to show links to setup-related admin pages.
 * - Highlights the trigger when any of the linked routes are active.
 *
 * ### Example
 * ```tsx
 * <BaseLayoutSetupNavigation />
 * ```
 *
 * ### Routes Covered
 * - `/admin/genres`
 * - `/admin/persons`
 * - `/admin/roletypes`
 * - `/admin/theatres`
 *
 * @remarks
 * - Uses {@link DropdownMenuLink} for navigation with integrated logging.
 * - Requires React Router context (`react-router-dom`).
 * - Uses `useCurrentURLPath()` to determine active state.
 */
const BaseLayoutSetupNavigationDropdown: FC = () => {
    // ⚡ URL ⚡

    const url = useCurrentURLPath();

    // ⚡ Check If Active ⚡

    const pathNames = [
        "/admin/genres",
        "/admin/persons",
        "/admin/roletypes",
        "/admin/theatres",
    ];

    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    size="sm"
                    className={cn(!isActive && HoverLinkCSS)}
                >
                    Setup <ChevronDown/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLink
                    to="/admin/genres"
                    component={BaseLayoutSetupNavigationDropdown.name}
                >
                    Genres
                </DropdownMenuLink>

                <DropdownMenuLink
                    to="/admin/persons"
                    component={BaseLayoutSetupNavigationDropdown.name}
                >
                    Persons
                </DropdownMenuLink>

                <DropdownMenuLink
                    to="/admin/roletypes"
                    component={BaseLayoutSetupNavigationDropdown.name}
                >
                    Role Types
                </DropdownMenuLink>

                <DropdownMenuLink
                    to="/admin/theatres"
                    component={BaseLayoutSetupNavigationDropdown.name}
                >
                    Theatres
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default BaseLayoutSetupNavigationDropdown;

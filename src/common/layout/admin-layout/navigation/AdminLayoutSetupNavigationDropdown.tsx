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
 * Admin setup navigation dropdown.
 *
 * @remarks
 * - Groups admin setup routes under a single dropdown
 * - Highlights active state based on current URL
 * - Intended for admin layout navigation bars
 */
const AdminLayoutSetupNavigationDropdown: FC = () => {
    const url = useCurrentURLPath();

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
                    component={AdminLayoutSetupNavigationDropdown.name}
                >
                    Genres
                </DropdownMenuLink>

                <DropdownMenuLink
                    to="/admin/persons"
                    component={AdminLayoutSetupNavigationDropdown.name}
                >
                    Persons
                </DropdownMenuLink>

                <DropdownMenuLink
                    to="/admin/roletypes/list"
                    component={AdminLayoutSetupNavigationDropdown.name}
                >
                    Role Types
                </DropdownMenuLink>

                <DropdownMenuLink
                    to="/admin/theatres"
                    component={AdminLayoutSetupNavigationDropdown.name}
                >
                    Theatres
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AdminLayoutSetupNavigationDropdown;

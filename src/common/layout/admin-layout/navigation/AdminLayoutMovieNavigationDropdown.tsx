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
 * Admin movie navigation dropdown.
 *
 * @remarks
 * - Groups movie-related admin routes
 * - Highlights active state based on current URL
 * - Intended for admin layout navigation bars
 */
const AdminLayoutMovieNavigationDropdown: FC = () => {
    const url = useCurrentURLPath();

    const pathNames = [
        "/admin/movies",
        "/admin/showings",
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
                    Movies <ChevronDown/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLink
                    to="/admin/movies"
                    component={AdminLayoutMovieNavigationDropdown.name}
                >
                    Movies
                </DropdownMenuLink>

                <DropdownMenuLink
                    to="/admin/showings"
                    component={AdminLayoutMovieNavigationDropdown.name}
                >
                    Showings
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AdminLayoutMovieNavigationDropdown;

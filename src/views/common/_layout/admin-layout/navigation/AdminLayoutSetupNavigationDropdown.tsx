import {ReactElement} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/views/common/_comp/ui/dropdown-menu.tsx";
import {useCurrentURLPath} from "@/common/_feat/navigation/useCurrentURLPath.ts";
import {DropdownMenuLink} from "@/views/common/_feat/navigation/DropdownMenuLink.tsx";
import {NavigationDropdownButton} from "@/views/common/_comp/buttons/NavigationDropdownButton.tsx";

/**
 * A navigational dropdown providing centralised access to core system entities and catalogs.
 */
export function AdminLayoutSetupNavigationDropdown(): ReactElement {
    const url = useCurrentURLPath();

    const pathNames = [
        "/admin/genres",
        "/admin/persons",
        "/admin/roletypes",
        "/admin/theatres",
        "/admin/movies",
    ];

    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <NavigationDropdownButton text="Setup" isActive={isActive}/>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Setup</DropdownMenuLabel>
                    <DropdownMenuLink to="/admin/genres">Genres</DropdownMenuLink>
                    <DropdownMenuLink to="/admin/persons">Persons</DropdownMenuLink>
                    <DropdownMenuLink to="/admin/roletypes/list">Role Types</DropdownMenuLink>
                    <DropdownMenuLink to="/admin/theatres">Theatres</DropdownMenuLink>
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Movies</DropdownMenuLabel>
                    <DropdownMenuLink to="/admin/movies">Movies</DropdownMenuLink>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
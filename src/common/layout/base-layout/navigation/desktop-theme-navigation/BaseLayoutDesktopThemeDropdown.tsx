import {FC} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {ChevronDown} from "lucide-react";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {ThemeContext} from "@/common/context/theme/ThemeContext.ts";
import {cn} from "@/common/lib/utils.ts";
import {HoverLinkCSS} from "@/common/constants/country/ButtonCSS.ts";

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
const BaseLayoutDesktopThemeDropdown: FC = () => {
    const {themeVariant, updateThemeVariant} = useRequiredContext({context: ThemeContext});

    return (
        <DropdownMenu>

            {/* Trigger button */}
            <DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    size="sm"
                    className={HoverLinkCSS}
                >
                    Theme <ChevronDown/>
                </Button>
            </DropdownMenuTrigger>

            {/* Dropdown content */}
            <DropdownMenuContent>
                <DropdownMenuItem
                    className={cn(themeVariant !== "system" && "text-neutral-400")}
                    onClick={() => updateThemeVariant("system")}
                >
                    System
                </DropdownMenuItem>

                <DropdownMenuItem
                    className={cn(themeVariant !== "light" && "text-neutral-400")}
                    onClick={() => updateThemeVariant("light")}
                >
                    Light
                </DropdownMenuItem>

                <DropdownMenuItem
                    className={cn(themeVariant !== "dark" && "text-neutral-400")}
                    onClick={() => updateThemeVariant("dark")}
                >
                    Dark
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    );
};

export default BaseLayoutDesktopThemeDropdown;

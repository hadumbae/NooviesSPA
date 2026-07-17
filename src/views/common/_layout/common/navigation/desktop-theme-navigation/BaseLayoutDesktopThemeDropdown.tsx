/**
 * @fileoverview Dropdown menu for selecting the application theme variant in the desktop layout.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {ChevronDown} from "lucide-react";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {ThemeContext} from "@/common/_feat/theme/ctx/ThemeContext.ts";
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/common/components/ui";

/**
 * Desktop navigation dropdown for switching between light, dark, and system themes.
 */
export function BaseLayoutDesktopThemeDropdown(): ReactElement {
    const {themeVariant, updateThemeVariant} = useRequiredContext({context: ThemeContext});

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" size="sm" className="hover-button">
                    Theme <ChevronDown/>
                </Button>
            </DropdownMenuTrigger>

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
}

/**
 * @file Sidebar group component for theme selection.
 * @filename LayoutThemeSidebarGroup.tsx
 */

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem
} from "@/common/components/ui/sidebar.tsx";
import {ThemeButtonSelectors} from "@/views/common/_comp/ui-theme/ThemeButtonSelectors.tsx";

/**
 * Renders a specialized sidebar section containing global theme controls.
 */
export const LayoutThemeSidebarGroup = () => {
    return (
        <SidebarGroup className="py-0">
            <SidebarGroupLabel>
                Theme
            </SidebarGroupLabel>

            <SidebarMenu>
                <SidebarMenuItem>
                    <ThemeButtonSelectors/>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};
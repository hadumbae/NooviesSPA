/**
 * @file Interactive button group for switching between application theme variants.
 * @filename ThemeButtonSelectors.tsx
 */

import {Button} from "@/common/components/ui/button.tsx";
import {LucideIcon, Moon, Sun, SunMoon} from "lucide-react";
import {ThemeVariant} from "@/common/schema/enums/ThemeVariantEnumSchema.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {ThemeContext} from "@/common/context/theme/ThemeContext.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Internal metadata for rendering theme toggle buttons.
 */
type ButtonMetadata = {
    /** Whether the button represents the currently active theme. */
    isSelected: boolean;
    /** The specific theme variant this button activates. */
    variant: ThemeVariant;
    /** The Lucide icon associated with the theme variant. */
    icon: LucideIcon;
}

/**
 * Provides a row of icon buttons to control the global {@link ThemeContext}.
 * * * **State Awareness:** Consumes `themeVariant` to highlight the active selection with the primary brand color.
 * * **Reactivity:** Triggers `updateThemeVariant` on click to persist and apply new styles across the DOM.
 * * **Visuals:** Maps "system", "light", and "dark" variants to their respective semantic icons (SunMoon, Sun, Moon).
 */
export const ThemeButtonSelectors = () => {
    /** Accesses the mandatory theme context; throws an error if used outside of ThemeProvider. */
    const {themeVariant, updateThemeVariant} = useRequiredContext({
        context: ThemeContext,
        message: "Must be used within a theme provider.",
    });

    /** Configuration for the three supported theme modes. */
    const buttons: ButtonMetadata[] = [
        {isSelected: themeVariant === "system", variant: "system", icon: SunMoon},
        {isSelected: themeVariant === "light", variant: "light", icon: Sun},
        {isSelected: themeVariant === "dark", variant: "dark", icon: Moon},
    ];

    return (
        <div className="flex justify-center items-center space-x-6">
            {buttons.map(({isSelected, variant, icon: Icon}) => (
                <Button
                    key={variant}
                    variant="outline"
                    size="icon"
                    onClick={() => updateThemeVariant(variant)}
                    className={cn(
                        "text-gray-300",
                        isSelected && "text-primary",
                    )}
                >
                    <Icon/>
                </Button>
            ))}
        </div>
    );
};
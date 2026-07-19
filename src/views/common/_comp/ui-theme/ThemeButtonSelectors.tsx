/**
 * @fileoverview Interactive button group for switching between application theme variants.
 */

import {Button} from "@/views/common/_comp/ui/button.tsx";
import {LucideIcon, Moon, Sun, SunMoon} from "lucide-react";
import {ThemeVariant} from "@/common/_schemas/enums/ThemeVariantSchema.ts";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {ThemeContext} from "@/common/_feat/theme/ctx/ThemeContext.ts";
import {cn} from "@/common/_feat";
import {ReactElement} from "react";

/** Metadata for rendering individual theme selection buttons. */
type ButtonMetadata = {
    isSelected: boolean;
    variant: ThemeVariant;
    icon: LucideIcon;
}

/**
 * Component for selecting the application theme variant.
 * Must be used within a ThemeContext provider.
 */
export function ThemeButtonSelectors(): ReactElement {
    const {themeVariant, updateThemeVariant} = useRequiredContext({
        context: ThemeContext,
        message: "Must be used within a theme provider.",
    });

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
}
import { FC } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/common/lib/utils.ts";

/**
 * Props for the {@link LucideIconText} component.
 *
 * Renders a Lucide icon next to a text label, with optional sizing and
 * customizable Tailwind/CSS class overrides for each element.
 */
type IconTextProps = {
    /** The Lucide icon component to display (from `lucide-react`). */
    icon: LucideIcon;

    /** The text label displayed beside the icon. */
    text: string;

    /**
     * The icon’s size, in pixels or CSS units.
     *
     * @default 15
     */
    size?: string | number | undefined;

    /**
     * Optional CSS classes applied to the icon element.
     *
     * Accepts any valid Tailwind or CSS utility string.
     */
    iconCSS?: string;

    /**
     * Optional CSS classes applied to the text element.
     *
     * The text element includes a default `"select-none"` class to prevent selection.
     */
    textCSS?: string;

    /**
     * Optional CSS classes for the container element.
     *
     * Merged with the default `"flex items-center space-x-2"`.
     */
    className?: string;
};

/**
 * **LucideIconText**
 *
 * A utility component that displays a Lucide icon alongside text.
 * Useful for labeled buttons, list items, tooltips, or info tags.
 *
 * @example
 * ```tsx
 * import { AlertCircle } from "lucide-react";
 *
 * <LucideIconText
 *   icon={AlertCircle}
 *   text="Warning"
 *   size={18}
 *   iconCSS="text-yellow-500"
 *   textCSS="text-sm font-medium text-yellow-800"
 * />
 * ```
 */
const LucideIconText: FC<IconTextProps> = (props) => {
    const { text, icon: Icon, size = 15, className, iconCSS, textCSS } = props;

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Icon size={size} className={cn(iconCSS)} />
            <span className={cn("select-none", textCSS)}>{text}</span>
        </div>
    );
};

export default LucideIconText;

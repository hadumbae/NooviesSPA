import {Badge} from "@/common/components/ui/badge.tsx";
import LabelContent from "@/common/components/card-content/LabelContent.tsx";
import BadgeVariant from "@/common/type/ui/shad-cn-badge/BadgeVariant.ts";
import {Key, ReactNode} from "react";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for {@link BadgeListLabel}.
 *
 * @typeParam TItem - The type of items being rendered as badges.
 */
type LabelProps<TItem = unknown> = {
    /**
     * Visual style of the badges. Defaults to `"outline"`.
     */
    variant?: BadgeVariant;

    /**
     * Layout orientation of the label + content.
     * - `"horizontal"`: label on the left, badges on the right.
     * - `"vertical"`: label above, badges below.
     *
     * Defaults to `"vertical"`.
     */
    orientation?: "horizontal" | "vertical";

    /**
     * Custom class names applied to the badge container inside {@link LabelContent}.
     */
    className?: string;

    /**
     * Text label displayed alongside the badge list.
     */
    label: string;

    /**
     * Array of items to be displayed as badges.
     */
    items: TItem[];

    /**
     * Function that extracts the text to display inside each badge.
     *
     * @param item - The item from the {@link items} array.
     * @returns A string or number to render inside the badge.
     */
    renderText: (item: TItem) => string | number;

    /**
     * Custom content to render if the list is empty.
     * Defaults to `"None"` in muted text.
     */
    emptyText?: ReactNode;

    /**
     * Function that generates a unique React `key` for each badge.
     *
     * If not provided, it will:
     * - Use `item._id` if present,
     * - Otherwise fall back to the `item` itself.
     *
     * @param item - The item from the {@link items} array.
     * @returns A unique React key.
     */
    getKey?: (item: TItem) => Key;
};

/**
 * A labeled container that renders a list of items as badges.
 *
 * Typically used for displaying metadata such as genres, languages,
 * or tags in a structured card layout.
 *
 * Example:
 * ```tsx
 * <BadgeListLabel
 *   label="Genres"
 *   items={[{_id: "1", name: "Action"}, {_id: "2", name: "Drama"}]}
 *   renderText={(genre) => genre.name}
 * />
 *
 * <BadgeListLabel
 *   label="Languages"
 *   items={["English", "Spanish"]}
 *   renderText={(lang) => lang}
 * />
 * ```
 */
const BadgeListLabel = <TItem = unknown>(props: LabelProps<TItem>) => {
    const {
        items,
        renderText,
        getKey = (item) =>
            (typeof item === "object" && item !== null && "_id" in item ? item._id : item) as Key,
        variant = "outline",
        emptyText,
        className,
        ...remProps
    } = props;

    const mappedItems = items.map((item) => (
        <Badge key={getKey(item)} variant={variant}>
            {renderText(item)}
        </Badge>
    ));

    return (
        <LabelContent classNames={{content: cn("space-x-2", className)}} {...remProps}>
            {items.length > 0 ? mappedItems : emptyText ?? <span className="text-neutral-400">None</span>}
        </LabelContent>
    );
};

export default BadgeListLabel;

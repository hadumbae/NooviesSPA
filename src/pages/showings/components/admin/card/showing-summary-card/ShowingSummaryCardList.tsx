import { cn } from "@/common/lib/utils.ts";
import { SecondaryTextBaseCSS } from "@/common/constants/css/TextCSS.ts";
import { ShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import ShowingSummaryCard from "@/pages/showings/components/admin/card/showing-summary-card/ShowingSummaryCard.tsx";

type ListProps = {
    /** List of fully populated showings to render */
    showings: ShowingDetails[];
    /** Optional wrapper class overrides */
    className?: string;
};

/**
 * Renders a vertical list of {@link ShowingSummaryCard} components.
 *
 * @remarks
 * - Displays a centered empty-state message when no showings are available.
 * - Optimized for admin overview and management pages.
 */
const ShowingSummaryCardList = ({ showings, className }: ListProps) => {
    if (showings.length === 0) {
        return (
            <div className={cn("flex justify-center items-center h-28", className)}>
                <span className={cn(SecondaryTextBaseCSS, "capitalize select-none")}>
                    There Are No Showings
                </span>
            </div>
        );
    }

    return (
        <div className={cn("grid grid-cols-1 gap-2", className)}>
            {showings.map((showing) => (
                <ShowingSummaryCard key={showing._id} showing={showing} />
            ))}
        </div>
    );
};

export default ShowingSummaryCardList;

/**
 * @fileoverview Renders a vertical list of showing summary cards.
 */

import { cn } from "@/common/lib/utils.ts";
import { SecondaryTextBaseCSS } from "@/common/constants/css/TextCSS.ts";
import {ShowingSummaryCard} from "@/domains/showings/components/admin/card/showing-summary-card/ShowingSummaryCard.tsx";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ReactElement} from "react";

/** Props for the ShowingSummaryCardList component. */
type ListProps = {
    showings: ShowingDetails[];
    className?: string;
};

/** Renders a vertical list of showing summary cards. */
export function ShowingSummaryCardList({ showings, className }: ListProps): ReactElement {
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
}
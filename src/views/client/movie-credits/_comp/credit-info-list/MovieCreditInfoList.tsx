/**
 * @fileoverview List component for displaying movie credits.
 */

import {
    MovieCreditInfoListItem
} from "@/views/client/movie-credits/_comp/credit-info-list/MovieCreditInfoListItem.tsx";
import {cn} from "@/common/lib/utils.ts";
import {CreditExceptMovie} from "@/domains/moviecredit";
import {ReactElement} from "react";

/** Props for the MovieCreditInfoList component. */
type ListProps = {
    hideAvatar?: boolean;
    credits: CreditExceptMovie[];
    className?: string;
}

/**
 * Renders a list of movie credits.
 */
export function MovieCreditInfoList(
    {credits, hideAvatar, className}: ListProps
): ReactElement {
    return (
        <ul className={cn("list-none border shadow-md", className)}>
            {
                credits.map((credit, index) => (
                    <MovieCreditInfoListItem
                        key={credit._id}
                        credit={credit}
                        hideAvatar={hideAvatar}
                        className={cn(
                            !(index % 2) && "bg-gray-100 secondary-text"
                        )}
                    />
                ))
            }
        </ul>
    );
}


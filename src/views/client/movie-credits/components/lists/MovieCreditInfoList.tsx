/**
 * @file List component for displaying movie credits.
 * @filename MovieCreditInfoList.tsx
 */

import MovieCreditInfoListItem from "@/views/client/movie-credits/components/lists/MovieCreditInfoListItem.tsx";
import {cn} from "@/common/lib/utils.ts";
import {CreditExceptMovie} from "@/domains/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.types.ts";

/**
 * Props for {@link MovieCreditInfoList}.
 */
type ListProps = {
    /** Whether avatars should be hidden in list items */
    hideAvatar?: boolean;

    /** Credits rendered in the list */
    credits: CreditExceptMovie[];

    /** Optional CSS classes applied to the list container */
    className?: string;
}

/**
 * Renders a list of movie credits.
 */
const MovieCreditInfoList = (
    {credits, hideAvatar, className}: ListProps
) => {
    return (
        <ul className={cn(
            "list-none border shadow-md",
            className
        )}>
            {
                credits.map((credit, index) => (
                    <MovieCreditInfoListItem
                        key={credit._id}
                        credit={credit}
                        hideAvatar={hideAvatar}
                        className={cn(
                            !(index % 2) && "bg-gray-100"
                        )}
                    />
                ))
            }
        </ul>
    );
};

export default MovieCreditInfoList;
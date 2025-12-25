import {MovieCreditQueryOptions} from "@/pages/moviecredit/schemas/filters/MovieCreditQueryOptions.types.ts";
import useFetchPaginatedMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchPaginatedMovieCredits.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import {PaginatedMovieCreditDetailsSchema} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.schema.ts";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedMovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.types.ts";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import MoviePersonDetailsCard from "@/pages/movies/components/admin/credits/cards/MoviePersonDetailsCard.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";

/**
 * Props for {@link MovieCreditPaginatedListQuery}.
 */
type QueryProps = PaginationValues &
    MovieCreditQueryOptions & {
    /** Updates the current pagination page */
    setPage: (page: number) => void;

    /** Optional container class name */
    className?: string;
};

/**
 * Renders a paginated list of movie credits with query handling,
 * schema validation, and pagination controls.
 *
 * Handles empty states and query lifecycle automatically.
 *
 * @param props Pagination values, query filters, and UI options
 */
const MovieCreditPaginatedListQuery = (props: QueryProps) => {
    const {className, page, perPage, setPage, ...queries} = props;

    const query = useFetchPaginatedMovieCredits({
        page,
        perPage,
        queryConfig: {populate: true, virtuals: true},
        queries: queries,
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedMovieCreditDetailsSchema}>
                {({totalItems, items: credits}: PaginatedMovieCreditDetails) => {
                    if (credits.length === 0) {
                        return (
                            <div className={cn("flex justify-center items-center h-28")}>
                                <span className={cn(SecondaryTextBaseCSS, "capitalize select-none")}>
                                    There Are No Credits
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div className="space-y-5">
                            <div className={cn("grid grid-cols-1 gap-2", className)}>
                                {credits.map((credit) => (
                                    <MoviePersonDetailsCard
                                        key={credit._id}
                                        credit={credit}
                                    />
                                ))}
                            </div>

                            {totalItems > perPage && (
                                <PaginationRangeButtons
                                    page={page}
                                    perPage={perPage}
                                    totalItems={totalItems}
                                    setPage={setPage}
                                />
                            )}
                        </div>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MovieCreditPaginatedListQuery;

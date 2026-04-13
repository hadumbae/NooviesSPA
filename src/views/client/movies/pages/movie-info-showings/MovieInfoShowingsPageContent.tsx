/**
 * @file Presentational content for movie showings including filters and list.
 * @filename MovieInfoShowingsPageContent.tsx
 */

import PageFlexWrapper from "@/views/common/_comp/page/PageFlexWrapper.tsx";
import TheatreShowingQueryFormContainer
    from "@/domains/showings/components/forms/theatre-showing-query/TheatreShowingQueryFormContainer.tsx";
import {DisableKeys} from "@/common/type/form/HookFormFieldTypes.ts";
import {
    ShowingsPageQueryStrings
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.types.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {
    ShowingsPageQueryStringSchema
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.schema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import ShowingInfoCompactListCard
    from "@/domains/showings/components/client/showing-list/ShowingInfoCompactListCard.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import MovieInfoHeader from "@/views/client/movies/components/headers/MovieInfoHeader.tsx";
import {PopulatedShowing} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

/**
 * Props for {@link MovieInfoShowingsPageContent}.
 */
type ContentProps = {
    /** Current active page index. */
    page: number;

    /** Items per page limit for layout spacing. */
    perPage: number;

    /** Callback to update page state in parent. */
    setPage: (page: number) => void;

    /** Primary {@link MovieDetails} used for the header and filtering context. */
    movie: MovieDetails;

    /** Total results count used to calculate {@link PaginationRangeButtons}. */
    totalShowings: number;

    /** List of {@link PopulatedShowing} records to be rendered as cards. */
    showings: PopulatedShowing[];
};

/**
 * Renders filtered {@link ShowingInfoCompactListCard} results with {@link PaginationRangeButtons}.
 */
const MovieInfoShowingsPageContent = (
    {page, perPage, movie, totalShowings, showings, setPage}: ContentProps
) => {
    const {title, posterImage, slug} = movie;

    const {searchParams: presetValues} = useParsedSearchParams({
        schema: ShowingsPageQueryStringSchema,
        defaultValues: {page},
    });

    /** Pagination handled by parent via {@link setPage}. */
    const disabledFields: DisableKeys<ShowingsPageQueryStrings> = [
        "page",
    ];

    return (
        <PageFlexWrapper className="space-y-6">
            <MovieInfoHeader
                movieSlug={slug}
                movieTitle={title}
                posterURL={posterImage?.secure_url}
                pageText="Showings"
            />

            <section>
                <SectionHeader srOnly={true}>Theatre Options</SectionHeader>

                <Card>
                    <CardContent className="p-2">
                        <TheatreShowingQueryFormContainer
                            disableFields={disabledFields}
                            presetValues={presetValues}
                        />
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-2">
                <SectionHeader>Showings</SectionHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {showings.map(showing => (
                        <ShowingInfoCompactListCard
                            key={showing._id}
                            showing={showing}
                        />
                    ))}
                </div>

                {totalShowings > perPage && (
                    <PaginationRangeButtons
                        page={page}
                        perPage={perPage}
                        totalItems={totalShowings}
                        setPage={setPage}
                    />
                )}
            </section>
        </PageFlexWrapper>
    );
};

export default MovieInfoShowingsPageContent;
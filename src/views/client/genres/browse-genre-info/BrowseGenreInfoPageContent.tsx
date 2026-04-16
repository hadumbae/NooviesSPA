/**
 * @file Presentational content for the client-facing Genre Detail page.
 * @filename BrowseGenreInfoPageContent.tsx
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import GenreInfoBanner from "@/views/client/genres/_comp/GenreInfoBanner.tsx";
import PaginatedMovieDetailsDataLoader from "@/domains/movies/components/loaders/PaginatedMovieDetailsDataLoader.tsx";
import useParsedPaginationValue from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import BrowseMovieOverviewCard
    from "@/domains/movies/components/client/browse-movies/browse-movie-overview/BrowseMovieOverviewCard.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {Genre} from "@/domains/genres/schema";

/** Default pagination limit for the movie sub-collection. */
const MOVIES_PER_PAGE = 10;

/**
 * Props for the {@link BrowseGenreInfoPageContent} component.
 */
type ContentProps = {
    /** The core genre metadata to display and use as a filter for the movie list. */
    genre: Genre;
};

/**
 * Renders the structural layout for browsing a specific genre and its associated movies.
 * @param props - Component {@link ContentProps}.
 */
const BrowseGenreInfoPageContent = ({genre}: ContentProps) => {
    const {_id: genreID, name} = genre;

    /** Manages the 'page' search param, defaulting to 1 if not present. */
    const {
        value: page,
        setValue: setPage,
    } = useParsedPaginationValue("page", 1);

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Genre</HeaderDescription>
            </header>

            <GenreInfoBanner genre={genre}/>

            <PaginatedMovieDetailsDataLoader
                page={page}
                perPage={MOVIES_PER_PAGE}
                genres={[genreID]}
            >
                {({totalItems, items: movies}) => {
                    if (!movies.length) {
                        return (
                            <div className="flex-1 flex justify-center items-center py-20">
                                <span className={cn(
                                    SecondaryTextBaseCSS,
                                    "italic uppercase select-none opacity-50"
                                )}>
                                    There Are No Movies
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div className="space-y-6">
                            {/* Responsive Movie Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {movies.map(movie => (
                                    <BrowseMovieOverviewCard
                                        key={movie._id}
                                        movie={movie}
                                    />
                                ))}
                            </div>

                            {totalItems > MOVIES_PER_PAGE && (
                                <PaginationRangeButtons
                                    page={page}
                                    perPage={MOVIES_PER_PAGE}
                                    totalItems={totalItems}
                                    setPage={setPage}
                                />
                            )}
                        </div>
                    );
                }}
            </PaginatedMovieDetailsDataLoader>
        </PageFlexWrapper>
    );
};

export default BrowseGenreInfoPageContent;
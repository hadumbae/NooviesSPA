/**
 * @file BrowseGenreInfoPageContent.tsx
 * @description
 * Page content component for browsing a single genre,
 * displaying genre metadata and a paginated list of movies.
 */

import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import GenreInfoBanner from "@/pages/genres/components/client/browse-genre/GenreInfoBanner.tsx";
import PaginatedMovieDetailsDataLoader from "@/pages/movies/components/loaders/PaginatedMovieDetailsDataLoader.tsx";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import BrowseMovieOverviewCard
    from "@/pages/movies/components/client/browse-movies/browse-movie-overview/BrowseMovieOverviewCard.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

const MOVIES_PER_PAGE = 10;

/**
 * Props for {@link BrowseGenreInfoPageContent}.
 */
type ContentProps = {
    /**
     * Genre metadata used for display and context.
     */
    genre: GenreDetails;
};

/**
 * Renders genre information and a paginated movie list.
 *
 * Handles pagination via URL search params and
 * conditionally renders empty states and pagination controls.
 *
 * @param props Component props
 */
const BrowseGenreInfoPageContent = ({genre}: ContentProps) => {
    const {_id: genreID, name} = genre;

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
                            <div className="flex-1 flex justify-center items-center">
                                <span className={cn(
                                    SecondaryTextBaseCSS,
                                    "italic uppercase select-none"
                                )}>
                                    There Are No Movies
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div className="space-y-3">
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

/**
 * @file MovieDetailsPageTabs.tsx
 *
 * @summary
 * Tabbed interface for displaying movie details in the admin panel.
 *
 * @description
 * Provides a tab layout for movie credits and showings, including:
 * - Movie credits overview (with query and validation)
 * - Paginated showings list with summary and navigation
 * - URL sync via search parameters
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs.tsx";
import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import MovieDetailsPageCreditTab from "@/pages/movies/pages/admin/movie-details-page/tabs/MovieDetailsPageCreditTab.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {
    MOVIE_DETAILS_PAGE_TABS,
    MovieDetailsSearchParams,
} from "@/pages/movies/schema/admin/search-params/MovieDetailsSearchParams.ts";
import ShowingSummaryListQuery from "@/pages/showings/components/features/showing-summary-list-query/ShowingSummaryListQuery.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import { List } from "lucide-react";

/**
 * @summary Props for MovieDetailsPageTabs.
 */
type PageTabContent = {
    /** The movie to display details for. */
    movie: MovieDetails;

    /** Optional CSS class for styling the tabs container. */
    className?: string;
};

/** Tab values for movie details page. */
type TabValue = typeof MOVIE_DETAILS_PAGE_TABS[number];

/**
 * @summary Admin movie details tabs component.
 *
 * @description
 * Displays movie credits and showings in a tabbed layout.
 * Manages active tab state via URL search parameters.
 *
 * @param movie - The movie whose details are displayed.
 * @param className - Optional styling for the tabs container.
 */
const MovieDetailsPageTabs = ({ movie, className }: PageTabContent) => {
    const { _id: movieID, slug: movieSlug } = movie;

    const { searchParams, setSearchParams } = useParsedSearchParams({ schema: MovieDetailsSearchParams });

    const { activeTab = "credits" } = searchParams;
    const setActiveTab = (tab: TabValue) => setSearchParams({ ...searchParams, activeTab: tab });

    return (
        <Tabs
            className={className}
            defaultValue={activeTab}
            onValueChange={(value: string) => setActiveTab(value as TabValue)}
        >
            <div className="flex justify-center">
                <TabsList>
                    <TabsTrigger value="credits">Movie Credits</TabsTrigger>
                    <TabsTrigger value="showings">Showings</TabsTrigger>
                </TabsList>
            </div>

            <MovieDetailsPageCreditTab slug={movieSlug} />

            <TabsContent value="showings" className="space-y-4">
                <div className="flex justify-between items-center">
                    <PrimaryHeaderText>Showings</PrimaryHeaderText>

                    <LoggedLink to={`/admin/showings?movie=${movieID}`}>
                        <IconButton>
                            <List />
                        </IconButton>
                    </LoggedLink>
                </div>

                <ShowingSummaryListQuery movie={movieID} sortByStartTime={1} limit={10} />
            </TabsContent>
        </Tabs>
    );
};

export default MovieDetailsPageTabs;

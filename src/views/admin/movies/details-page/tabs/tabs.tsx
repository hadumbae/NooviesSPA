/**
 * @fileoverview Orchestrates the tabbed navigation for the Movie Details page.
 * Synchronizes the active tab state with URL search parameters to ensure
 * deep-linking capability for Credits and Showings views.
 */

import {Tabs, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {
    MOVIE_DETAILS_PAGE_TABS,
    MovieDetailsSearchParams,
} from "@/domains/movies/schema/admin/search-params/MovieDetailsSearchParams.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsPageShowingsTab} from "@/views/admin/movies/details-page/tabs/showingsTab.tsx";
import {MovieDetailsPageCastCreditTab} from "@/views/admin/movies/details-page/tabs/creditTab.tsx";
import {ReactElement} from "react";

type PageTabContent = {
    movie: MovieDetails;
    className?: string;
};

type TabValue = typeof MOVIE_DETAILS_PAGE_TABS[number];

/**
 * Renders the tabbed interface for movie-related data.
 */
export function MovieDetailsPageTabs(
    {movie: {_id: movieID, slug: movieSlug}, className}: PageTabContent
): ReactElement {
    const {searchParams, setSearchParams} = useParsedSearchParams({
        schema: MovieDetailsSearchParams
    });

    const {activeTab = "credits"} = searchParams;

    const setActiveTab = (tab: TabValue) => {
        setSearchParams({...searchParams, activeTab: tab});
    };

    return (
        <Tabs
            className={className}
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabValue)}
        >
            <div className="flex justify-center">
                <TabsList>
                    <TabsTrigger value="credits">Movie Credits</TabsTrigger>
                    <TabsTrigger value="showings">Showings</TabsTrigger>
                </TabsList>
            </div>

            <MovieDetailsPageCastCreditTab slug={movieSlug}/>

            <MovieDetailsPageShowingsTab movieID={movieID}/>
        </Tabs>
    );
}
/**
 * @file MyProfilePageFavouriteTab.tsx
 *
 * Favourites tab content for the My Profile page.
 *
 * @remarks
 * - Fetches a limited subset of the current user's favourite movies.
 * - Displays a preview list inside the profile tab layout.
 * - Provides a navigation link to the full favourites page.
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {MyProfilePageActiveTab} from "@/domains/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {useFetchCurrentUserFavourites} from "@/domains/users/fetch/favourites/useFetchCurrentUserFavourites.ts";
import {PaginatedMovieDetailsSchema} from "@/domains/movies/schema/movie/Movie.schema.ts";
import {PaginatedMovieDetails} from "@/domains/movies/schema/movie/Movie.types.ts";
import {cn} from "@/common/lib/utils.ts";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import MyFavouriteMovieCompactCard from "@/features/client/movies/components/card/favourites/MyFavouriteMovieCompactCard.tsx";
import {ChevronRight} from "lucide-react";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";

type TabProps = {
    /**
     * Tab value associated with this content panel.
     *
     * @defaultValue "favourites"
     */
    tabValue?: MyProfilePageActiveTab;

    /** Optional className applied to the tab container. */
    className?: string;
};

/** Maximum number of favourite movies displayed in the profile preview tab. */
const FAVOURITES_LIMIT = 10;

/**
 * Renders the "Favourites" tab panel within the My Profile page.
 *
 * @remarks
 * - Fetches the first page of favourites using a fixed preview limit.
 * - Validates API response using `PaginatedMovieDetailsSchema`.
 * - Displays an empty state if the user has no favourites.
 * - Includes a navigation link to the full favourites page.
 *
 * @param props - {@link TabProps} controlling tab identity and layout.
 *
 * @returns A tab content panel showing a limited favourites preview
 *          or an empty state when no favourites exist.
 */
const MyProfilePageFavouriteTab = (
    {tabValue = "favourites", className}: TabProps
) => {
    const query = useFetchCurrentUserFavourites({page: 1, perPage: FAVOURITES_LIMIT});

    return (
        <TabsContent
            value={tabValue}
            className={cn("flex flex-col space-y-4", className)}
        >
            <div className="flex justify-between items-center">
                <PrimaryHeaderText>My Favourites</PrimaryHeaderText>
                <LoggedHoverLink to="/account/favourites">
                    <ChevronRight/> More Favourites
                </LoggedHoverLink>
            </div>

            <ValidatedDataLoader query={query} schema={PaginatedMovieDetailsSchema}>
                {({totalItems, items: movies}: PaginatedMovieDetails) => {
                    if (totalItems === 0) {
                        return (
                            <EmptyArrayContainer
                                text="You Have No Favourites"
                                className={cn(RoundedBorderCSS, "flex-1")}
                            />
                        );
                    }

                    return (
                        <div className="space-y-5">
                            <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {movies.map(movie =>
                                    <MyFavouriteMovieCompactCard key={movie.slug} movie={movie}/>
                                )}
                            </section>
                        </div>
                    )
                }}
            </ValidatedDataLoader>
        </TabsContent>
    );
};

export default MyProfilePageFavouriteTab;
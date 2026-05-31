/**
 * @fileoverview Favourites tab content for the My Profile page.
 *
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {MyProfilePageActiveTab} from "@/domains/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {useFetchCurrentUserFavourites} from "@/domains/users/fetch/favourites/useFetchCurrentUserFavourites.ts";
import {cn} from "@/common/lib/utils.ts";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";
import MyFavouriteMovieCompactCard
    from "@/views/client/movies/components/card/favourites/MyFavouriteMovieCompactCard.tsx";
import {ChevronRight} from "lucide-react";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/schema/movie";
import {PaginatedItems} from "@/common/types";
import {ReactElement} from "react";

/** Props for the MyProfilePageFavouriteTab component. */
type TabProps = {
    tabValue?: MyProfilePageActiveTab;
    className?: string;
};

const FAVOURITES_LIMIT = 10;

/** Renders the favourites tab panel within the My Profile page. */
export function MyProfilePageFavouriteTab(
    {tabValue = "favourites", className}: TabProps
): ReactElement {
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

            <ValidatedDataLoader query={query} schema={generatePaginationSchema(MovieDetailsSchema)}>
                {({totalItems, items: movies}: PaginatedItems<MovieDetails>) => {
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
}

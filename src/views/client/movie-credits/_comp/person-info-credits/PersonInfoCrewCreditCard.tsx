/**
 * @fileoverview Card component displaying a crew member's credit information for a specific movie.
 */

import {ReactElement} from "react";
import {PersonCrewCredit} from "@/domains/movie-credits";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {BrowseMoviePosterLink} from "@/views/admin/movies";
import {PersonInfoCreditHeader} from "@/views/client/movie-credits";

/** Props for the PersonInfoCrewCreditCard component. */
type CardProps = {
    credit: PersonCrewCredit;
};

/**
 * Renders a card showing movie poster, title, release date, and the specific crew role held by a person.
 */
export function PersonInfoCrewCreditCard(
    {credit}: CardProps
): ReactElement {
    const {
        movie: {title: movieTitle, slug: movieSlug, posterImage: moviePoster, releaseDate},
        creditedAs,
        roleType,
        displayRoleName,
    } = credit;

    return (
        <Card>
            <CardContent className="p-0 flex space-x-3">
                <BrowseMoviePosterLink
                    className="h-full w-16 rounded-r-none"
                    url={moviePoster?.secure_url}
                    slug={movieSlug}
                />

                <div className="flex-1 py-3 pr-4 flex flex-col space-y-3">
                    <PersonInfoCreditHeader
                        movieSlug={movieSlug}
                        movieTitle={movieTitle}
                        releaseDate={releaseDate}
                        classNames={{container: "flex-1"}}
                    />

                    <p className="primary-text font-medium text-sm">
                        {displayRoleName || roleType.roleName} {creditedAs && `(credited as ${creditedAs})`}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
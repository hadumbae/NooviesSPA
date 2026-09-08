/**
 * @fileoverview Card component displaying a crew member's credit information for a specific movie.
 */

import {ReactElement} from "react";
import {PersonCrewCredit} from "@/domains/movie-credits";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {MoviePosterImage} from "@/views/admin/movies";
import {PersonInfoCreditHeader} from "@/views/client/movie-credits";
import {Link} from "react-router-dom";

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
        <Link to={`/browse/movies/${movieSlug}`}>
            <Card>
                <CardContent className="p-0 flex space-x-3">
                    <MoviePosterImage
                        className="h-32 rounded-r-none"
                        url={moviePoster?.secure_url}
                    />

                    <div className="flex-1 py-3 pr-4 flex flex-col space-y-3">
                        <PersonInfoCreditHeader
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
        </Link>
    );
}
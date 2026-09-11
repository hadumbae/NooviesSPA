/**
 * @fileoverview Card component displaying a person's acting credit details for a specific movie.
 */

import {ReactElement} from "react";
import {PersonCastCredit} from "@/domains/movie-credits";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image/MoviePosterImage.tsx";
import {MovieCreditCastFlags} from "@/views/admin/movie-credits";
import {PersonInfoCreditHeader} from "@/views/client/movie-credits";
import {Link} from "react-router-dom";

/** Props for the PersonInfoCastCreditCard component. */
type CardProps = {
    credit: PersonCastCredit;
};

/** Displays movie details, character name, and credit flags for a cast member. */
export function PersonInfoCastCreditCard(
    {credit}: CardProps
): ReactElement {
    const {
        movie: {title: movieTitle, slug: movieSlug, posterImage: moviePoster, releaseDate},
        characterName,
        creditedAs,
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
                            as {characterName} {creditedAs && `(credited as ${creditedAs})`}
                        </p>

                        <MovieCreditCastFlags credit={credit}/>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
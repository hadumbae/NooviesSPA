/**
 * @file Compact favourite movie browse card.
 * MyFavouriteMovieCompactCard.tsx
 */

import formatMovieData from "@/domains/movies/utility/formatMovieData.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PosterImage from "@/domains/movies/components/images/PosterImage.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondarySpan from "@/views/common/_comp/text/SecondarySpan.tsx";
import buildString from "@/common/utility/buildString.ts";
import PrimarySpan from "@/views/common/_comp/text/PrimarySpan.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {Info} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import BrowseMovieSummaryDialog
    from "@/domains/movies/components/client/browse-movies/browse-movie-summary-dialog/BrowseMovieSummaryDialog.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

/** Props for MyFavouriteMovieCompactCard. */
type CardProps = {
    /** Source movie details. */
    movie: MovieDetails;
}

/** Renders a compact favourite movie summary for browse views. */
const MyFavouriteMovieCompactCard = (
    {movie}: CardProps
) => {
    const {slug, title, tagline, formatted} = formatMovieData(movie);
    const {posterURL, releaseYear, duration, genreList} = formatted;

    const movieMeta = buildString([releaseYear, duration, genreList], " • ");

    const infoDialogTrigger = (
        <BrowseMovieSummaryDialog movie={movie}>
            <Info
                size={20}
                className={cn(
                    HoverLinkCSS,
                    "cursor-pointer",
                )}
            />
        </BrowseMovieSummaryDialog>
    );

    return (
        <Card>
            <CardContent className="p-4 space-y-5">
                <div className="flex items-stretch space-x-4">
                    <section>
                        <PosterImage src={posterURL} className="h-40"/>
                    </section>

                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-center space-x-2">
                            <section className="flex-1">
                                <LoggedLink
                                    to={`/browse/movies/${slug}`}
                                    component={MyFavouriteMovieCompactCard.name}
                                    className="hover:underline underline-offset-4"
                                >
                                    <PrimaryHeaderText as="h2">{title}</PrimaryHeaderText>
                                </LoggedLink>

                                <SecondarySpan>{movieMeta}</SecondarySpan>
                            </section>

                            {infoDialogTrigger}
                        </div>

                        <PrimarySpan className="italic">
                            "{tagline}"
                        </PrimarySpan>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MyFavouriteMovieCompactCard;
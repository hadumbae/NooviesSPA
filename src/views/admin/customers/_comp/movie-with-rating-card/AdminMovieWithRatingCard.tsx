/**
 * @fileoverview A card component displaying movie details and ratings for administrative views.
 */

import {MovieWithRating} from "@/domains/movies/_schema/movie/MovieWithRatingSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {cn} from "@/common/lib/utils.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import {
    ISO6391LanguageLabels as ISO6391LanguageConstant
} from "@/common/_const/languages/ISO6391LanguageLabels.ts";
import {
    AdminMovieWithRatingCardStat
} from "@/views/admin/customers/_comp/movie-with-rating-card/AdminMovieWithRatingCardStat.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {VerticalDivider} from "@/views/common/_comp/VerticalDivider.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {MovieRatingBadge} from "@/views/admin/movie-reviews/_comp";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {ReactElement} from "react";

/** Props for the AdminMovieWithRatingCard component. */
type CardProps = {
    movie: MovieWithRating;
    className?: string;
};

/** Renders a data-dense card providing a quick overview of a movie's status and rating. */
export function AdminMovieWithRatingCard(
    {movie, className}: CardProps
): ReactElement {
    const {
        genres,
        title,
        posterImage,
        runtime,
        originalLanguage,
        releaseDate,
        tagline,
        averageRating,
        slug
    } = movie;

    const genreLabels = genres.map(g => g.name).join(", ");
    const movieRuntime = formatMovieRuntime(runtime, true);
    const releaseYear = releaseDate ? releaseDate.toFormat("yyyy") : "Unreleased";

    return (
        <Card>
            <CardContent className={cn("p-3 space-y-2", className)}>
                <div className="flex items-stretch space-x-2">
                    <LoggedLink to={`/admin/movies/get/${slug}`}>
                        <MoviePosterImageDialog
                            className="h-32 rounded-sm"
                            url={posterImage?.secure_url}
                            alt={`${title} Poster Image`}
                        />
                    </LoggedLink>

                    <div className="flex-1 flex flex-col space-y-2">
                        <div className="flex-1">
                            <LoggedLink className="hover-underline inline-block" to={`/admin/movies/get/${slug}`}>
                                <h3 className="subsection-title line-clamp-1 pb-1">
                                    {title} ({releaseYear})
                                </h3>
                            </LoggedLink>

                            <h4 className="subsection-subtitle italic line-clamp-2">
                                "{tagline}"
                            </h4>
                        </div>

                        <MovieRatingBadge rating={averageRating}/>
                    </div>
                </div>

                <Separator/>

                <div className="flex gap-x-2">
                    <AdminMovieWithRatingCardStat
                        className="flex-1"
                        label="Genres"
                        text={genreLabels}
                    />

                    <VerticalDivider/>

                    <AdminMovieWithRatingCardStat
                        className="flex-1"
                        label="Runtime"
                        text={movieRuntime}
                    />

                    <VerticalDivider/>

                    <AdminMovieWithRatingCardStat
                        className="flex-1"
                        label="Orig. Lan."
                        text={ISO6391LanguageConstant[originalLanguage]}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

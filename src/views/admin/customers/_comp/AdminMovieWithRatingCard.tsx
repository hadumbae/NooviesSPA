/**
 * @file Specialized card component for displaying movie details and average ratings within admin views.
 * @filename AdminMovieWithRatingCard.tsx
 */

import {MovieWithRating} from "@/domains/movies/schema/movie/MovieWithRatingSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {cn} from "@/common/lib/utils.ts";
import PosterImage from "@/domains/movies/components/images/PosterImage.tsx";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import {AdminMovieWithRatingCardStat} from "@/views/admin/customers/_comp/AdminMovieWithRatingCardStat.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {VerticalDivider} from "@/views/common/components/VerticalDivider.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {MovieRatingBadge} from "@/views/admin/moviereviews/components/model-badges";

/**
 * Props for the AdminMovieWithRatingCard component.
 */
type CardProps = {
    /** The movie data object including metadata and aggregated rating scores. */
    movie: MovieWithRating;
    /** Optional CSS classes for container overrides. */
    className?: string;
};

/**
 * Renders a data-dense card used in administrative contexts to provide a quick
 * overview of a movie's status and core attributes.
 * ---
 */
export const AdminMovieWithRatingCard = (
    {movie, className}: CardProps
) => {
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
                        <PosterImage
                            className="h-32 rounded-sm"
                            src={posterImage?.secure_url}
                            alt={`${title} Poster Image`}
                        />
                    </LoggedLink>

                    <div className="flex-1 flex flex-col space-y-2">
                        <div className="flex-1">
                            <LoggedLink
                                className="hover-underline inline-block"
                                to={`/admin/movies/get/${slug}`}
                            >
                                <h3 className="subsection-title line-clamp-1 pb-1">
                                    {title} ({releaseYear})
                                </h3>
                            </LoggedLink>

                            <h4 className="subsection-subtitle italic line-clamp-2">
                                "{tagline}"
                            </h4>
                        </div>

                        {/* Visual rating indicator */}
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
};
/**
 * @file MovieInfoOverview.tsx
 * @description
 * Composes the main movie overview section, combining the headline,
 * poster image, metadata, and primary credit links into a single layout.
 *
 * The layout adapts responsively for large and small screens.
 */
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import MovieInfoHeadline from "@/pages/movies/components/client/browse-movies/movie-info/MovieInfoHeadline.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PosterImage from "@/pages/movies/components/images/PosterImage.tsx";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import MovieInfoOverviewMeta
    from "@/pages/movies/components/client/browse-movies/movie-info/movie-info-overview/MovieInfoOverviewMeta.tsx";
import MovieInfoOverviewCreditLinks
    from "@/pages/movies/components/client/browse-movies/movie-info/movie-info-overview/MovieInfoOverviewCreditLinks.tsx";

/**
 * Props for {@link MovieInfoOverview}.
 */
type OverviewProps = {
    /** Movie data used throughout the overview */
    movie: MovieDetails;
    /** Credit entries associated with the movie */
    credits: MovieCreditDetails[];
};

/**
 * Renders the complete movie overview card.
 *
 * @param props - {@link OverviewProps}
 * @returns A composed movie overview layout
 *
 * @example
 * ```tsx
 * <MovieInfoOverview movie={movie} credits={credits} />
 * ```
 */
const MovieInfoOverview = ({movie, credits}: OverviewProps) => {
    const {posterImage} = movie;

    return (
        <div className="space-y-3">
            <MovieInfoHeadline movie={movie}/>

            <Card>
                <CardContent className="p-0">
                    <div className="grid lg:grid-rows-[2fr_1fr] grid-cols-3 lg:max-h-[400px]">
                        {/* Poster Image */}
                        <section className="lg:row-span-2 flex justify-center items-center p-2">
                            <PosterImage
                                src={posterImage?.secure_url}
                                className="max-lg:w-full lg:h-[350px]"
                            />
                        </section>

                        {/* Meta */}
                        <section className="col-span-2 px-3 py-3">
                            <MovieInfoOverviewMeta className="space-y-4" movie={movie}/>
                        </section>

                        {/* Credit Links */}
                        <section className="max-lg:col-span-3 lg:col-span-2 px-3 py-3">
                            <MovieInfoOverviewCreditLinks credits={credits}/>
                        </section>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MovieInfoOverview;

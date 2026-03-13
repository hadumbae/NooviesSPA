/**
 * @file Overview header section combining headline, poster, metadata, and credit links.
 *
 * MovieOverviewHeader.tsx
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import MovieOverviewHeadline
    from "@/features/client/movies/pages/movie-info/rows/movie-info-overview/MovieOverviewHeadline.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/Movie.types.ts";
import PosterImage from "@/domains/movies/components/images/PosterImage.tsx";
import MovieOverviewMeta
    from "@/features/client/movies/pages/movie-info/rows/movie-info-overview/MovieOverviewMeta.tsx";
import MovieOverviewCreditLinks
    from "@/features/client/movies/pages/movie-info/rows/movie-info-overview/MovieOverviewCreditLinks.tsx";
import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/movie-credit-details-schema/MovieCreditDetails.types.ts";

/**
 * Props for MovieOverviewHeader.
 */
type OverviewProps = {
    /**
     * Movie details used throughout the overview.
     */
    movie: MovieDetails;

    /**
     * Credit entries associated with the movie.
     */
    credits: MovieCreditDetails[];
};

/**
 * Renders the movie overview header layout.
 */
const MovieOverviewHeader = ({movie, credits}: OverviewProps) => {
    const {posterImage} = movie;

    return (
        <div className="space-y-3">
            <MovieOverviewHeadline movie={movie}/>

            <Card>
                <CardContent className="p-0">
                    <div className="grid lg:grid-rows-[2fr_1fr] grid-cols-3 lg:max-h-[400px]">
                        <section className="lg:row-span-2 flex justify-center items-center p-2">
                            <PosterImage src={posterImage?.secure_url} className="max-lg:w-full lg:h-[350px]"/>
                        </section>

                        <section className="col-span-2 px-3 py-3">
                            <MovieOverviewMeta className="space-y-4" movie={movie}/>
                        </section>

                        <section className="max-lg:col-span-3 lg:col-span-2 px-3 py-3">
                            <MovieOverviewCreditLinks credits={credits}/>
                        </section>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MovieOverviewHeader;
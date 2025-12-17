import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import MoviePosterImage from "@/pages/movies/components/MoviePosterImage.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import buildString from "@/common/utility/buildString.ts";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import ISO3166Alpha2ShortCountryConstant from "@/common/constants/country/ISO3166Alpha2ShortCountryConstant.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {Badge} from "@/common/components/ui/badge.tsx";

type CardProps = {
    movie: MovieDetails;
}

const ShowingMovieCard = ({movie}: CardProps) => {
    const {
        _id,
        title,
        originalTitle,
        posterImage,
        releaseDate,
        runtime,
        country,
        tagline,
        genres,
    } = movie;

    // --- Formatted ---
    const formattedTitle = buildString([title, releaseDate?.toFormat("(yyyy)")]);
    const formattedRuntime = formatMovieRuntime(runtime, true);
    const formattedMetadata = buildString(
        [
            originalTitle,
            releaseDate ? `Released ${releaseDate.toFormat("yyyy")}` : "Unreleased",
            ISO3166Alpha2ShortCountryConstant[country],
            formattedRuntime
        ],
        " • ",
    );

    // --- Genre ---

    const genreBadges = genres.map(({_id: genreID, name}) => (
        <Badge key={genreID} variant="outline">
            {name}
        </Badge>
    ));

    return (
        <Card>
            <CardContent className="px-3 py-5">
                <div className="flex items-start space-x-2">
                    {/*Poster Image*/}
                    <section>
                        <SectionHeader srOnly={true}>Movie Poster</SectionHeader>
                        <MoviePosterImage src={posterImage?.secure_url} className="h-full"/>
                    </section>
                    <div className="flex-1 space-y-4">
                        <section className="space-y-2">
                            <SectionHeader srOnly={true}>Movie Header</SectionHeader>

                            <LoggedLink to={`/admin/movies/get/${_id}`}>
                                <PrimaryHeaderText
                                    as="h2"
                                    className="hover:underline hover:underline-offset-4"
                                >
                                    {formattedTitle}
                                </PrimaryHeaderText>
                            </LoggedLink>

                            <SecondaryHeaderText as="h3" className="text-sm">
                                {tagline}
                            </SecondaryHeaderText>

                            <SecondaryHeaderText as="h4" className="text-xs">
                                {formattedMetadata}
                            </SecondaryHeaderText>
                        </section>

                        <section className="flex justify-center space-x-2">
                            {genreBadges}
                        </section>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ShowingMovieCard;

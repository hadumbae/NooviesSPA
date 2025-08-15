import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import formatDuration from "@/common/utility/formatDuration.ts";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import {Badge} from "@/common/components/ui/badge.tsx";
import LabelContent from "@/common/components/LabelContent.tsx";
import {Link} from "react-router-dom";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";

interface Props {
    movie: Movie;
}

const MovieDetailsCard: FC<Props> = ({movie}) => {
    const {originalTitle, originalLanguage, country, runtime, trailerURL, genres, languages, subtitles} = movie;

    const movieDuration = formatDuration(runtime);
    const countryName = ISO3166Alpha2CountryConstant[country];
    const originalLanguageName = ISO6391LanguageConstant[originalLanguage];

    const genreBadges = (genres as Genre[]).map(
        ({_id, name}) => <Badge key={_id} variant="outline">{name}</Badge>
    );

    const languageBadges = subtitles.map(
        (language) => <Badge key={language} variant="outline">{ISO6391LanguageConstant[language]}</Badge>
    );

    const subtitleBadges = subtitles.map(
        (subtitle) => <Badge key={subtitle} variant="outline">{ISO6391LanguageConstant[subtitle]}</Badge>
    );

    return (
        <Card>
            <CardContent className="p-4 space-y-3">
                <LabelContent label="Original Title" orientation="horizontal">{originalTitle}</LabelContent>

                <LabelContent label="Country" orientation="horizontal">{countryName}</LabelContent>

                <LabelContent label="Original Language" orientation="horizontal">{originalLanguageName}</LabelContent>

                <LabelContent label="Runtime" orientation="horizontal">{movieDuration}</LabelContent>

                <LabelContent label="Trailer" orientation="horizontal">
                    {
                        trailerURL ?
                            <Link to={trailerURL} className="text-neutral-500 hover:underline hover:text-black">
                                Link
                            </Link> : "None"
                    }
                </LabelContent>

                <LabelContent label="Genres" orientation="horizontal" classNames={{content: "space-x-2"}}>
                    {genres.length > 0 ? genreBadges : "None"}
                </LabelContent>

                <LabelContent label="Languages" orientation="horizontal" classNames={{content: "space-x-2"}}>
                    {languages.length > 0 ? languageBadges : "None"}
                </LabelContent>

                <LabelContent label="Subtitles" orientation="horizontal" classNames={{content: "space-x-2"}}>
                    {subtitles.length > 0 ? subtitleBadges : "None"}
                </LabelContent>
            </CardContent>
        </Card>
    );
};

export default MovieDetailsCard;

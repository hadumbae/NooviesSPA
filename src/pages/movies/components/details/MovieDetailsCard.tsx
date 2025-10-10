import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import formatDuration from "@/common/utility/formatDuration.ts";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import LabelContent from "@/common/components/card-content/LabelContent.tsx";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import BadgeListLabel from "@/common/components/card-content/BadgeListLabel.tsx";
import {ISO6391Code} from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import CollapsibleTextblock from "@/common/components/text/CollapsibleTextblock.tsx";

type CardProps = {
    /** The full details of a movie to display in the card */
    movie: MovieDetails;
}

/**
 * Displays detailed information about a movie in a structured card layout.
 *
 * Sections include:
 * - Basic information (title, runtime, country, original language, genres)
 * - Synopsis (collapsible text block)
 * - Multimedia (trailer link)
 * - Language options (available audio languages and subtitles)
 *
 * @component
 * @example
 * <MovieDetailsCard movie={movieDetails} />
 */
const MovieDetailsCard: FC<CardProps> = ({movie}) => {
    const {
        title,
        originalTitle,
        originalLanguage,
        country,
        runtime,
        trailerURL,
        genres,
        languages,
        subtitles,
        synopsis,
    } = movie;

    // Format runtime for display (e.g., "2h 15m")
    const movieDuration = formatDuration(runtime);

    // Safe lookups with fallbacks for missing or unknown values
    const countryName = ISO3166Alpha2CountryConstant[country] ?? country?.toUpperCase() ?? "Unknown";
    const originalLanguageName = ISO6391LanguageConstant[originalLanguage] ?? originalLanguage?.toUpperCase() ?? "Unknown";

    /** Genres displayed as badges */
    const genresLabel = (
        <BadgeListLabel
            label="Genres"
            orientation="horizontal"
            items={genres}
            getKey={({_id}: Genre) => _id}
            renderText={({name}: Genre) => name}
        />
    );

    /** Audio languages displayed as badges */
    const languagesLabel = (
        <BadgeListLabel
            label="Languages"
            orientation="horizontal"
            items={languages}
            getKey={(lan: string) => lan}
            renderText={(lan: ISO6391Code) => ISO6391LanguageConstant[lan] ?? lan?.toUpperCase() ?? "Unknown"}
        />
    );

    /** Subtitles displayed as badges */
    const subtitlesLabel = (
        <BadgeListLabel
            label="Subtitles"
            orientation="horizontal"
            items={subtitles}
            getKey={(lan: string) => lan}
            renderText={(lan: ISO6391Code) => ISO6391LanguageConstant[lan] ?? lan?.toUpperCase() ?? "Unknown"}
        />
    );

    /** Section containing basic movie information */
    const basicSection = (
        <section className="space-y-3">
            <LabelContent label="Original Title" orientation="horizontal">{originalTitle ?? title}</LabelContent>
            {genresLabel}
            <LabelContent label="Runtime" orientation="horizontal">{movieDuration}</LabelContent>
            <LabelContent label="Country" orientation="horizontal">{countryName}</LabelContent>
            <LabelContent label="Original Language" orientation="horizontal">{originalLanguageName}</LabelContent>
        </section>
    );

    /** Section displaying trailer link */
    const multimediaSection = (
        <LabelContent label="Trailer" orientation="horizontal">
            {trailerURL ? (
                <a
                    href={trailerURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:underline hover:text-black"
                >
                    Link
                </a>
            ) : "None"}
        </LabelContent>
    );

    /** Section displaying audio languages and subtitles */
    const languageSection = (
        <section className="space-y-3">
            {languagesLabel}
            {subtitlesLabel}
        </section>
    );

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                {/* Basic Information Section */}
                <section>
                    <h2 className="text-lg font-bold">Basic Information</h2>
                    <Separator/>
                </section>
                {basicSection}

                {/* Synopsis Section */}
                <section>
                    <h2 className="text-lg font-bold">Synopsis</h2>
                    <Separator/>
                </section>
                <CollapsibleTextblock text={synopsis}/>

                {/* Multimedia Section */}
                <section>
                    <h2 className="text-lg font-bold">Multimedia</h2>
                    <Separator/>
                </section>
                {multimediaSection}

                {/* Language Options Section */}
                <section>
                    <h2 className="text-lg font-bold">Language Options</h2>
                    <Separator/>
                </section>
                {languageSection}
            </CardContent>
        </Card>
    );
};

export default MovieDetailsCard;
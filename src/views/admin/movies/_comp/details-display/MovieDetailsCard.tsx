/** @fileoverview Card component for displaying comprehensive movie details including metadata, synopsis, and localization. */

import {ReactElement} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import LabelContent from "@/common/components/card-content/LabelContent.tsx";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import BadgeListLabel from "@/common/components/card-content/BadgeListLabel.tsx";
import {ISO6391LanguageCode} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import CollapsibleTextblock from "@/common/components/text/CollapsibleTextblock.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";

/** Props for the MovieDetailsCard component. */
type CardProps = {
    movie: MovieDetails;
}

/**
 * Renders a structured card layout containing categorized movie information.
 */
export function MovieDetailsCard({movie}: CardProps): ReactElement {
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

    /** Formats numeric runtime into a human-readable duration string. */
    const movieDuration = formatMovieRuntime(runtime);

    const countryName = ISO3166Alpha2CountryConstant[country] ?? country?.toUpperCase() ?? "Unknown";
    const originalLanguageName = ISO6391LanguageConstant[originalLanguage] ?? originalLanguage?.toUpperCase() ?? "Unknown";

    const genresLabel = (
        <BadgeListLabel
            label="Genres"
            orientation="horizontal"
            items={genres}
            getKey={({_id}: Genre) => _id}
            renderText={({name}: Genre) => name}
            variant="default"
        />
    );

    const languagesLabel = (
        <BadgeListLabel
            label="Languages"
            orientation="horizontal"
            items={languages}
            getKey={(lan: string) => lan}
            renderText={(lan: ISO6391LanguageCode) => ISO6391LanguageConstant[lan] ?? lan?.toUpperCase() ?? "Unknown"}
        />
    );

    const subtitlesLabel = (
        <BadgeListLabel
            label="Subtitles"
            orientation="horizontal"
            items={subtitles}
            getKey={(lan: string) => lan}
            renderText={(lan: ISO6391LanguageCode) => ISO6391LanguageConstant[lan] ?? lan?.toUpperCase() ?? "Unknown"}
        />
    );

    const basicSection = (
        <section className="space-y-3">
            <LabelContent label="Original Title" orientation="horizontal">{originalTitle ?? title}</LabelContent>
            {genresLabel}
            <LabelContent label="Runtime" orientation="horizontal">{movieDuration}</LabelContent>
            <LabelContent label="Country" orientation="horizontal">{countryName}</LabelContent>
            <LabelContent label="Original Language" orientation="horizontal">{originalLanguageName}</LabelContent>
        </section>
    );

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

    const languageSection = (
        <section className="space-y-3">
            {languagesLabel}
            {subtitlesLabel}
        </section>
    );

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <header>
                    <h2 className="text-lg font-bold">Basic Information</h2>
                    <Separator/>
                </header>

                {basicSection}

                <section>
                    <h2 className="text-lg font-bold">Synopsis</h2>
                    <Separator/>
                </section>
                <CollapsibleTextblock text={synopsis}/>

                <section>
                    <h2 className="text-lg font-bold">Multimedia</h2>
                    <Separator/>
                </section>
                {multimediaSection}

                <section>
                    <h2 className="text-lg font-bold">Language Options</h2>
                    <Separator/>
                </section>
                {languageSection}
            </CardContent>
        </Card>
    );
}
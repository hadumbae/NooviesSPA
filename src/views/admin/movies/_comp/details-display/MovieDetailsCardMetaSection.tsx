/**
 * @fileoverview Component for displaying metadata and basic information of a movie in a card format.
 */

import {ReactElement} from "react";
import {Separator} from "@/views/common/_comp/ui";
import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";
import {ISO3166Alpha2CountryConstant, ISO6391LanguageLabels} from "@/common/_const";
import {MovieDetails} from "@/domains/movies";
import {LabelContentList, NoneSpan} from "@/views/common/_comp";
import {BadgeList} from "@/views/common/_comp/badges";

/** Props for the MovieDetailsCardMetaSection component. */
type SectionProps = {
    movie: MovieDetails;
};

/** Renders a section containing movie details such as title, genres, runtime, and origin. */
export function MovieDetailsCardMetaSection(
    {movie: {title, originalTitle, originalLanguage, country, runtime, genres}}: SectionProps
): ReactElement {
    const movieDuration = formatMovieRuntime(runtime);
    const countryName = ISO3166Alpha2CountryConstant[country] ?? country?.toUpperCase() ?? "Unknown";
    const originalLanguageName = ISO6391LanguageLabels[originalLanguage] ?? originalLanguage?.toUpperCase() ?? "Unknown";

    const genreBadges = genres.length > 0
        ? <BadgeList variant={"default"} entries={genres.map(({_id, name}) => ({key: _id, text: name}))}/>
        : <NoneSpan/>;

    return (
        <section className="space-y-3">
            <div>
                <h2 className="primary-text text-lg font-bold">Basic Information</h2>
                <Separator/>
            </div>

            <LabelContentList classNames={{list: "gap-x-10", content: "truncate"}} items={[
                {key: "origTitle", label: "Original Title", content: originalTitle ?? title},
                {key: "genres", label: "Genres", content: genreBadges},
                {key: "runtime", label: "Runtime", content: movieDuration},
                {key: "country", label: "Country", content: countryName},
                {key: "origLan", label: "Original Language", content: originalLanguageName},
            ]}
            />
        </section>
    );
}
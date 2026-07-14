/**
 * @fileoverview Component for displaying metadata and basic information of a movie in a card format.
 */

import {ReactElement} from "react";
import {Separator} from "@/common/components/ui";
import {LabelContent} from "@/common/components/card-content/LabelContent.tsx";
import BadgeListLabel from "@/common/components/card-content/BadgeListLabel.tsx";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import {ISO3166Alpha2CountryConstant, ISO6391LanguageLabels} from "@/common/_const";
import {MovieDetails} from "@/domains/movies";
import {Genre} from "@/domains/genres";

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

    return (
        <section className="space-y-3">
            <div>
                <h2 className="primary-text text-lg font-bold">Basic Information</h2>
                <Separator/>
            </div>

            <div className="space-y-3">
                <LabelContent label="Original Title" orientation="horizontal">
                    {originalTitle ?? title}
                </LabelContent>

                <BadgeListLabel
                    label="Genres"
                    orientation="horizontal"
                    items={genres}
                    getKey={({_id}: Genre) => _id}
                    renderText={({name}: Genre) => name}
                    variant="default"
                />

                <LabelContent label="Runtime" orientation="horizontal">
                    {movieDuration}
                </LabelContent>

                <LabelContent label="Country" orientation="horizontal">
                    {countryName}
                </LabelContent>

                <LabelContent label="Original Language" orientation="horizontal">
                    {originalLanguageName}
                </LabelContent>
            </div>
        </section>
    );
}
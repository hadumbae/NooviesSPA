/**
 * @fileoverview Component for displaying metadata and basic information of a movie in a card format.
 */

import {ReactElement} from "react";
import LabelContent from "@/common/components/card-content/LabelContent.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {MovieDetails} from "@/domains/movies/_schema/movie";
import BadgeListLabel from "@/common/components/card-content/BadgeListLabel.tsx";
import {
    ISO6391LanguageLabels as ISO6391LanguageConstant
} from "@/common/constants/languages/ISO6391LanguageLabels.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import {Genre} from "@/domains/genres/_schema";

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
    const originalLanguageName = ISO6391LanguageConstant[originalLanguage] ?? originalLanguage?.toUpperCase() ?? "Unknown";

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
/**
 * @fileoverview Component that displays the language and subtitle options for a movie.
 */

import {ReactElement} from "react";
import {MovieDetails} from "@/domains/movies/schema/movie";
import {Separator} from "@/common/components/ui/separator.tsx";
import BadgeListLabel from "@/common/components/card-content/BadgeListLabel.tsx";
import {ISO6391LanguageCode} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";

/** Props for the MovieDetailsCardLanguageSection component. */
type SectionProps = {
    movie: MovieDetails;
};

/** Renders a section containing badges for movie languages and subtitles. */
export function MovieDetailsCardLanguageSection(
    {movie: {languages, subtitles}}: SectionProps
): ReactElement {
    const renderLanguage = (lan: ISO6391LanguageCode) =>
        ISO6391LanguageConstant[lan] ??
        lan?.toUpperCase() ??
        "Unknown";

    return (
        <section className="space-y-3">
            <div>
                <h2 className="primary-text text-lg font-bold">Language Options</h2>
                <Separator/>
            </div>

            <div className="space-y-5">
                <BadgeListLabel
                    label="Languages"
                    orientation="horizontal"
                    items={languages}
                    getKey={(lan: string) => lan}
                    renderText={renderLanguage}
                />

                <BadgeListLabel
                    label="Subtitles"
                    orientation="horizontal"
                    items={subtitles}
                    getKey={(lan: string) => lan}
                    renderText={renderLanguage}
                />
            </div>
        </section>
    );
}
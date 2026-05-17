/**
 * @fileoverview Editorial information section for a movie detail page.
 *
 */

import {ReactElement} from "react";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {generateGenreLinkConfigs} from "@/domains/genres/_feat/navigation";
import {PageSectionHeader} from "@/views/common/_comp/page";

/** Props for the MovieOverviewEditorialInfo component. */
type RowProps = {
    movie: MovieDetails;
};

/** Displays the title, synopsis, tagline, and genres for a specific movie. */
export function MovieOverviewEditorialInfo(
    {movie: {title, originalTitle, synopsis, tagline, genres}}: RowProps
): ReactElement {
    const genreLinks = generateGenreLinkConfigs(genres);
    const textualCSS = cn(PrimaryTextBaseCSS, "text-sm");

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Movie Story And Details"/>

            <div className="space-y-2">
                <LabeledGroup label="Title">
                    <span className={textualCSS}>{title}</span>
                </LabeledGroup>

                <Separator/>

                {
                    originalTitle && <>
                        <LabeledGroup label="Also Known As">
                            <span className={textualCSS}>{originalTitle}</span>
                        </LabeledGroup>
                        <Separator/>
                    </>
                }

                {
                    tagline && <>
                        <LabeledGroup label="Tagline">
                            <span className={textualCSS}>{tagline}</span>
                        </LabeledGroup>
                        <Separator/>
                    </>
                }

                <LabeledGroup label="Genres">
                    <LinkGroup links={genreLinks} className="px-2"/>
                </LabeledGroup>

                <Separator/>

                <LabeledGroup label="Synopsis" className="items-start">
                    <p className={textualCSS}>{synopsis}</p>
                </LabeledGroup>
            </div>
        </section>
    );
}

/**
 * @fileoverview Editorial information section for a movie detail page.
 *
 */

import {ReactElement} from "react";
import {Separator} from "@/common/components/ui";
import {SeparatedLinks} from "@/views/common/_feat";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {generateGenreLinkConfigs} from "@/domains/genres";
import {MovieDetails} from "@/domains/movies";
import {LabelContent} from "@/views/common/_comp";

/** Props for the MovieOverviewEditorialInfo component. */
type RowProps = {
    movie: MovieDetails;
};

/** Displays the title, synopsis, tagline, and genres for a specific movie. */
export function MovieOverviewEditorialInfo(
    {movie: {title, originalTitle, synopsis, tagline, genres}}: RowProps
): ReactElement {
    const genreLinks = generateGenreLinkConfigs(genres);
    const textualCSS = "primary-text text-sm";

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Movie Story And Details"/>

            <div className="space-y-2">
                <LabelContent label="Title" orientation="horizontal">
                    <span className={textualCSS}>{title}</span>
                </LabelContent>

                <Separator/>

                {originalTitle && (<>
                    <LabelContent label="Also Known As" orientation="horizontal">
                        <span className={textualCSS}>{originalTitle}</span>
                    </LabelContent>
                    <Separator/>
                </>)}

                {tagline && (<>
                    <LabelContent label="Tagline" orientation="horizontal">
                        <span className={textualCSS}>{tagline}</span>
                    </LabelContent>
                    <Separator/>
                </>)}

                <LabelContent label="Genres" orientation="horizontal">
                    <SeparatedLinks links={genreLinks} className="px-2"/>
                </LabelContent>

                <Separator/>

                <LabelContent label="Synopsis" orientation="horizontal" classNames={{container: "items-start"}}>
                    <p className={textualCSS}>{synopsis}</p>
                </LabelContent>
            </div>
        </section>
    );
}

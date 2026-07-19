/**
 * @fileoverview Metadata section for the movie overview layout.
 *
 * MovieOverviewMeta.tsx
 */

import {ReactElement} from "react";
import {SeparatedLinks} from "@/views/common/_feat";
import {MovieDetails} from "@/domains/movies";
import {generateGenreLinkConfigs} from "@/domains/genres";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {LabelContent} from "@/views/common/_comp";
import {ScrollArea, ScrollBar} from "@/common/components/ui";

/** Props for the MovieOverviewMeta component. */
type OverviewProps = {
    className?: string;
    movie: MovieDetails;
};

/** Renders movie overview metadata including genres, tagline, and synopsis. */
export function MovieOverviewMeta({className, movie}: OverviewProps): ReactElement {
    const {originalTitle, tagline, genres, synopsis} = movie;
    const genreLinks = generateGenreLinkConfigs(genres);

    return (
        <div className={className}>
            <nav>
                <ScrollArea>
                    <SeparatedLinks links={genreLinks} className="default-pill"/>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            </nav>

            <section className="max-md:hidden space-y-1">
                <SROnly text="Technical Details"/>

                {
                    originalTitle &&
                    <LabelContent orientation="horizontal" label="Original Title">
                        <span className="text-sm">{originalTitle}</span>
                    </LabelContent>
                }

                <LabelContent orientation="horizontal" label="Tagline">
                    <span className="text-sm">{tagline}</span>
                </LabelContent>
            </section>

            <p className="primary-text text-sm">
                {synopsis}
            </p>
        </div>
    );
}

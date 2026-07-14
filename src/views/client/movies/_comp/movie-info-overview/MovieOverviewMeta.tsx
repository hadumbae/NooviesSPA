/**
 * @fileoverview Metadata section for the movie overview layout.
 *
 * MovieOverviewMeta.tsx
 */

import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {generateGenreLinkConfigs} from "@/domains/genres/_feat/navigation";
import {ReactElement} from "react";
import {SROnly} from "@/views/common/_comp/screen-readers";

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
                    <LinkGroup links={genreLinks} className="default-pill"/>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            </nav>

            <section className="max-md:hidden space-y-1">
                <SROnly text="Technical Details"/>

                {
                    originalTitle &&
                    <LabeledGroup label="Original Title">
                        <span className="text-sm">{originalTitle}</span>
                    </LabeledGroup>
                }

                <LabeledGroup label="Tagline">
                    <span className="text-sm">
                        {tagline}
                    </span>
                </LabeledGroup>
            </section>

            <p className="primary-text text-sm">
                {synopsis}
            </p>
        </div>
    );
}

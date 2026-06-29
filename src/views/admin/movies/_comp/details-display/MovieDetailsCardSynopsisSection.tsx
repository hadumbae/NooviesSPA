/**
 * @fileoverview A section component for displaying a movie's synopsis within a card.
 */

import {ReactElement} from "react";
import {MovieDetails} from "@/domains/movies/_schema/movie";
import {Separator} from "@/common/components/ui/separator.tsx";
import CollapsibleTextblock from "@/common/components/text/CollapsibleTextblock.tsx";

/** Props for the MovieDetailsCardSynopsisSection component. */
type SectionProps = {
    movie: MovieDetails
};

/**
 * Renders the movie synopsis with a collapsible text block.
 */
export function MovieDetailsCardSynopsisSection(
    {movie: {synopsis}}: SectionProps
): ReactElement {
    return (
        <section className="space-y-3">
            <div>
                <h2 className="primary-text text-lg font-bold">Synopsis</h2>
                <Separator/>
            </div>

            <CollapsibleTextblock text={synopsis}/>
        </section>
    );
}
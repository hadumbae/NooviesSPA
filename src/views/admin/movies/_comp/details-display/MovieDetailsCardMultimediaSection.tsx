/**
 * @fileoverview Section component for displaying movie multimedia links in the admin dashboard.
 */

import {ReactElement} from "react";
import {Separator} from "@/common/components/ui/separator.tsx";
import LabelContent from "@/common/components/card-content/LabelContent.tsx";
import {MovieDetails} from "@/domains/movies/_schema/movie";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";

/** Props for the MovieDetailsCardMultimediaSection component. */
type SectionProps = {
    movie: MovieDetails;
};

/**
 * Renders a section containing multimedia links, such as the movie trailer, for a specific movie.
 */
export function MovieDetailsCardMultimediaSection(
    {movie: {trailerURL}}: SectionProps
): ReactElement {
    return (
        <section className="space-y-3">
            <section>
                <h2 className="primary-text text-lg font-bold">Multimedia</h2>
                <Separator/>
            </section>

            <LabelContent label="Trailer" orientation="horizontal">
                {trailerURL ? (
                    <LoggedAnchor
                        href={trailerURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:underline hover:text-black"
                    >
                        Link
                    </LoggedAnchor>
                ) : "None"}
            </LabelContent>
        </section>
    );
}
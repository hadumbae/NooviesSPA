/**
 * @fileoverview Component for displaying a summary of movie showings on the movie overview page.
 */

import {PageSectionHeaderLink} from "@/views/common/_comp/page";
import {ReactElement} from "react";

/** Props for the MovieOverviewShowings component. */
type MovieOverviewShowingsProps = {
    movieSlug: string;
};

/** A section displaying a preview of available showings for a specific movie. */
export function MovieOverviewShowings({movieSlug}: MovieOverviewShowingsProps): ReactElement {
    return (
        <section className="space-y-4">
            <PageSectionHeaderLink
                to={`/browse/movies/${movieSlug}/showings`}
                text="Showings"
            />
        </section>
    );
}
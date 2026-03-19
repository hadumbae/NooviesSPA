/**
 * @file Displays a compact showings navigation section on the movie details page.
 * @filename MovieOverviewShowings.tsx
 */

import SectionHeaderLink from "@/common/components/page/SectionHeaderLink.tsx";

/**
 * Component props.
 */
type MovieOverviewShowingsProps = {
    /** Movie slug used for showings page routing */
    movieSlug: string;
};

/**
 * Renders a lightweight navigation section linking to the
 * movie's full showings page.
 */
const MovieOverviewShowings = ({movieSlug}: MovieOverviewShowingsProps) => {
    return (
        <section className="space-y-4">
            <SectionHeaderLink to={`/browse/movies/${movieSlug}/showings`}>
                Showings
            </SectionHeaderLink>
        </section>
    );
};

export default MovieOverviewShowings;
/**
 * @fileoverview Section component for displaying a responsive grid of upcoming showing cards on the client homepage.
 */

import {ReactElement} from "react";
import {Link} from "react-router-dom";
import {ShowingSummary} from "@/domains/showings";
import {PageSectionHeader} from "@/views/common/_comp";
import {HomepageShowingCard} from "@/views/client/homepage/_comp";

/** Props for the HomepageUpcomingShowingsSection component. */
type SectionProps = {
    showings: ShowingSummary[];
};

/** Displays a section containing upcoming showtimes linked to their detail pages. */
export function HomepageUpcomingShowingsSection(
    {showings}: SectionProps
): ReactElement {
    return (
        <section className="space-y-4">
            <PageSectionHeader text="Upcoming Showings"/>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {showings.map((showing) => (
                    <Link to={`/browse/showings/${showing.slug}`} key={showing._id}>
                        <HomepageShowingCard showing={showing}/>
                    </Link>
                ))}
            </div>
        </section>
    );
}
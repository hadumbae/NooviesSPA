/**
 * @fileoverview Section component for displaying a list of nearby theatres on the client homepage.
 */

import {ReactElement} from "react";
import {Link} from "react-router-dom";
import {TheatreDetails} from "@/domains/theatres";
import {PageSectionHeader} from "@/views/common/_comp";
import {HomepageTheatreCard} from "@/views/client/homepage/_comp";

/** Props for the HomepageTheatresSection component. */
type SectionProps = {
    theatres: TheatreDetails[];
};

/** Displays a section containing cards for theatres located near the user. */
export function HomepageTheatresSection(
    {theatres}: SectionProps
): ReactElement {
    return (
        <section className="space-y-4">
            <PageSectionHeader text="Theatres Near You"/>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {theatres.map((theatre) => (
                    <Link to={`/browse/theatres/${theatre.slug}`} key={theatre._id}>
                        <HomepageTheatreCard theatre={theatre}/>
                    </Link>
                ))}
            </div>
        </section>
    );
}
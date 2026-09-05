/**
 * @fileoverview Section component for displaying upcoming movie showtimes and runtimes in the theatre view.
 */

import {ReactElement} from "react";
import {TheatreMovieRuntimes} from "@/domains/theatres";
import {EmptyArrayContainer, PageSectionHeader} from "@/views/common/_comp";
import {TheatreMovieRuntimesCard} from "@/views/client/theatres/_comp";

/** Props for the TheatreInfoUpcomingSection component. */
type SectionProps = {
    upcoming: TheatreMovieRuntimes[];
};

/** Displays a grid of upcoming movies and their scheduled screen runtimes. */
export function TheatreInfoUpcomingSection(
    {upcoming}: SectionProps
): ReactElement {
    return (
        <section className="space-y-4">
            <PageSectionHeader text="Upcoming" />

            {
                upcoming.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {upcoming.map((runtimes) => ((
                            <TheatreMovieRuntimesCard
                                key={runtimes.movie._id}
                                runtimes={runtimes}
                            />
                        )))}
                    </div>
                ): (
                    <EmptyArrayContainer
                        text="This Theatre Has No Upcoming Showings"
                        className="h-44"
                    />
                )
            }
        </section>
    );
}
/**
 * @fileoverview Badge component for rendering showing summary details wrapped in a navigation link.
 */

import {ReactElement} from "react";
import {TheatreShowing} from "@/domains/theatres";
import {Sofa, Ticket} from "lucide-react";
import {Link} from "react-router-dom";

/** Props for the TheatreShowingSummaryBadge component. */
type BadgeProps = {
    showing: TheatreShowing;
};

/** Displays a clickable badge containing time, date, price, and seat reservation status for a showing. */
export function TheatreShowingSummaryBadge(
    {showing: {slug, startTime, ticketPrice, config: {canReserveSeats}}}: BadgeProps
): ReactElement {
    const startingTime = startTime.toFormat("HH:mm a");
    const startingDate = startTime.toFormat("dd LLL, yy");

    return (
        <Link to={`/browse/showings/${slug}`}>
            <div className="rounded-xl bg-blue-700 transition-colors dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-800 flex flex-col items-center justify-center p-2">
                <p className="text-sm font-medium text-white">
                    {startingTime}
                </p>

                <p className="text-sm font-medium text-white">
                    {startingDate}
                </p>

                <p className="text-sm font-medium text-white text-with-icon">
                    ${ticketPrice} {canReserveSeats ? <Sofa/> : <Ticket/>}
                </p>
            </div>
        </Link>
    );
}
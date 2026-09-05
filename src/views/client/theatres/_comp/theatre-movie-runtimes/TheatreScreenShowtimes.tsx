/**
 * @fileoverview Component for displaying showtimes organized under a specific theatre screen.
 */

import {ReactElement} from "react";
import {TheatreScreenSummary} from "@/domains/theatre-screens";
import {TheatreShowing} from "@/domains/theatres";
import {TheatreScreenTypeBadge} from "@/views/admin/theatre-screens";
import {
    TheatreShowingSummaryBadge
} from "@/views/client/theatres/_comp/theatre-movie-runtimes/TheatreShowingSummaryBadge.tsx";

/** Props for the TheatreScreenShowtimes component. */
type GroupProps = {
    screen: TheatreScreenSummary;
    showings: TheatreShowing[];
};

/**
 * Renders a list of showing badges for a specific screen along with its screen type badge.
 */
export function TheatreScreenShowtimes(
    {screen, showings}: GroupProps
): ReactElement {
    const {name, screenType} = screen;

    return (
        <div className="space-y-2">
            <div className="flex justify-start items-center space-x-2">
                <h5>{name}</h5>
                <TheatreScreenTypeBadge type={screenType}/>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {showings.map((showing) => (
                    <TheatreShowingSummaryBadge
                        key={showing._id}
                        showing={showing}
                    />
                ))}
            </div>
        </div>
    );
}
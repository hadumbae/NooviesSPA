/**
 * @fileoverview Summary item component for displaying individual reservation details in the admin user view.
 */

import {ReactElement} from "react";
import {PopulatedReservation} from "@/domains/reservations";
import {cn} from "@/common/_feat";
import {MoviePosterImage} from "@/views/admin/movies";
import {ReservationStatusBadge} from "@/views/client/reservations";

/** Custom class names for the summary item sub-components. */
type ItemClassNames = {
    container?: string;
    poster?: string;
    title?: string;
    subtitle?: string;
};

/** Props for the AdminUserReservationListSummaryItem component. */
type ItemProps = {
    reservation: PopulatedReservation;
    classNames?: ItemClassNames;
};

/**
 * Displays a concise summary of a reservation including movie poster, title, status, and time.
 */
export function AdminUserReservationListSummaryItem(
    {reservation, classNames}: ItemProps
): ReactElement {
    const {status, showing: {movie: {title: movieTitle, posterImage}, startTime}} = reservation;
    const formattedTime = startTime.toFormat("LLL dd yyyy, h:mm a");

    return (
        <div className={cn("flex justify-start items-center space-x-4 p-2", classNames?.container)}>
            <MoviePosterImage url={posterImage?.secure_url} className={cn("w-12", classNames?.poster)}/>

            <div className="flex-1 space-y-2 min-w-0">
                <h3 className={cn("primary-text font-bold truncate", classNames?.title)}>{movieTitle}</h3>

                <div className="flex items-center space-x-4">
                    <ReservationStatusBadge status={status}/>
                    <span className={cn("text-sm font-bold secondary-text truncate", classNames?.subtitle)}>
                        {formattedTime}
                    </span>
                </div>
            </div>
        </div>
    );
}
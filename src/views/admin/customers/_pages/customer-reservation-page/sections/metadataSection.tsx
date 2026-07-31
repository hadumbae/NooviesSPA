/**
 * @fileoverview Main header and metadata layout section for displaying a customer's specific reservation.
 */

import {ReactElement} from "react";
import {ReservationStatusBadge} from "@/views/client/reservations";
import {AdminReservation} from "@/domains/reservations";
import {MoviePosterImage} from "@/views/admin/movies";
import {CustomerReservationSummaryCard} from "@/views/admin/reservations";

/** Props for the CustomerReservationMetadataSection component. */
type SectionProps = {
    reservation: AdminReservation;
};

/**
 * Renders the top summary section for a reservation, including the unique code, badge status, poster, and details card.
 */
export function CustomerReservationMetadataSection(
    {reservation}: SectionProps
): ReactElement {
    const {uniqueCode, slug, status, snapshot: {movie: {posterURL}}} = reservation;

    return (
        <section className="space-y-4">
            <div className='flex justify-between items-center'>
                <div className="space-y-1">
                    <h2 className="section-title text-2xl">{uniqueCode}</h2>
                    <h3 className="section-subtitle text-xs italic">{slug}</h3>
                </div>

                <ReservationStatusBadge status={status}/>
            </div>

            <div className="flex space-x-3">
                <MoviePosterImage className="h-36 md:h-48" url={posterURL}/>
                <CustomerReservationSummaryCard reservation={reservation}/>
            </div>
        </section>
    );
}
/**
 * @file Layout section for displaying a grid of customer reservation cards in the admin profile.
 * @filename CustomerProfileReservationSection.tsx
 */

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {Reservation} from "@/domains/reservation/schema/model";

import {CustomerReservationCard} from "@/views/admin/customers/_comp";
import {PageSectionHeader} from "@/views/common/_comp/page";

/**
 * Properties for the CustomerProfileReservationSection component.
 * ---
 */
type SectionProps = {
    /** The unique identifier of the customer whose reservations are being viewed. */
    code: UserUniqueCode;
    /** The total count of reservations available (metadata from API). */
    itemCount: number;
    /** The subset of reservation documents to render in the current view. */
    reservations: Reservation[];
};

/**
 * Renders a structured grid of reservation summaries with a descriptive header.
 * ---
 */
export const CustomerProfileReservationSection = (
    {code, itemCount, reservations}: SectionProps
) => {
    return (
        <section className="space-y-4">
            <PageSectionHeader text={`Reservations (${itemCount})`}/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reservations.map((reservation) => (
                    <CustomerReservationCard
                        code={code}
                        key={reservation._id}
                        reservation={reservation}/>
                ))}
            </div>
        </section>
    );
};
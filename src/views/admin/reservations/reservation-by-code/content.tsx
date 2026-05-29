/**
 * @fileoverview Presentation layer for the reservation lookup interface.
 */

import {AdminReservation, ReservationUniqueCode} from "@/domains/reservation/schema/model";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {
    ReservationByCodePageHeader
} from "@/views/admin/reservations/reservation-by-code/headers/ReservationByCodePageHeader.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {
    ReservationByCodeDataContent
} from "@/views/admin/reservations/reservation-by-code/data.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {SetReservationCodeForm, SetReservationCodeFormCard} from "@/views/admin/reservations/_feat";
import {ReactElement} from "react";

/** Props for the ReservationByCodePageContent component. */
type ContentProps = {
    code: ReservationUniqueCode | null;
    reservation: AdminReservation | null;
};

/** Renders the layout and sections for the reservation-by-code feature. */
export function ReservationByCodePageContent(
    {code, reservation}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <ReservationByCodePageHeader/>

            <section className="flex justify-center">
                <SetReservationCodeForm
                    presetValues={{code: code ?? ""}}
                    className="max-md:flex-1 lg:w-1/2"
                >
                    <SetReservationCodeFormCard/>
                </SetReservationCodeForm>
            </section>

            <Separator/>

            {
                reservation ? (
                    <ReservationByCodeDataContent
                        reservation={reservation}
                    />
                ) : (
                    <EmptyArrayContainer
                        text="Enter A Valid Code To Look Up Reservations"
                        className="flex-1"
                    />
                )
            }
        </PageFlexWrapper>
    );
}
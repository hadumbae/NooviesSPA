/**
 * @fileoverview Presentation layer for the reservation lookup interface.
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {Separator} from "@/common/components/ui/separator.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

import {AdminReservation, ReservationUniqueCode} from "@/domains/reservation";
import {SetReservationCodeForm, SetReservationCodeFormCard} from "@/views/admin/reservations/_feat";
import {ReservationByCodePageHeader} from "@/views/admin/reservations/_pages/reservation-by-code/headers";
import {ReservationByCodeDataContent} from "@/views/admin/reservations/_pages/reservation-by-code/data.tsx";

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
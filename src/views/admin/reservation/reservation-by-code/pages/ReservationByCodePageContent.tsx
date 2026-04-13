/**
 * @file Presentation layer for the reservation lookup interface.
 * @filename ReservationByCodePageContent.tsx
 */

import {AdminReservation, ReservationUniqueCode} from "@/domains/reservation/schema/model";
import PageFlexWrapper from "@/views/common/_comp/page/PageFlexWrapper.tsx";
import {
    ReservationByCodePageHeader
} from "@/views/admin/reservation/reservation-by-code/pages/headers/ReservationByCodePageHeader.tsx";
import {
    SetReservationCodeForm, SetReservationCodeFormCard
} from "@/views/admin/reservation/reservation-by-code/components/set-code-form";
import {Separator} from "@/common/components/ui/separator.tsx";
import {
    ReservationByCodeDataContent
} from "@/views/admin/reservation/reservation-by-code/pages/sections/ReservationByCodeDataContent.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

/**
 * Properties for the {@link ReservationByCodePageContent} component.
 */
type ContentProps = {
    /** The code currently being searched or displayed. */
    code: ReservationUniqueCode | null;
    /** The retrieved reservation data, or null if no search has been performed/found. */
    reservation: AdminReservation | null;
};

/**
 * Renders the layout and sections for the reservation-by-code feature.
 */
export const ReservationByCodePageContent = (
    {code, reservation}: ContentProps
) => {
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
};
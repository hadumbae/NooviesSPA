// ReservationByCodePageContent.tsx

import {AdminReservation, ReservationUniqueCode} from "@/domains/reservation/schema/model";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
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

type ContentProps = {
    code: ReservationUniqueCode | null;
    reservation: AdminReservation | null;
};

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
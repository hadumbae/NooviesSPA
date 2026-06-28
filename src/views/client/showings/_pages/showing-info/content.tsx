/**
 * @fileoverview Presentational content layer for the Showing Details page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

import {ShowingDetails} from "@/domains/showings";
import {ReservationType} from "@/domains/reservation";
import {ShowingSelectorInfoCard} from "@/views/client/showings/_comp";
import {ShowingInfoPageHeader} from "@/views/client/showings/_pages/showing-info/header.tsx";
import {ReservationForm, ReservationFormView} from "@/views/client/reservations/_feat";

/** Props for the ShowingInfoPageContent component. */
type ContentProps = {
    showing: ShowingDetails;
};

/**
 * Renders formatted showing metadata and the interactive ticket reservation workflow.
 */
export function ShowingInfoPageContent(
    {showing}: ContentProps
): ReactElement {
    const navigate = useLoggedNavigate();
    const reservationType: ReservationType = showing.config.canReserveSeats
        ? "RESERVED_SEATS"
        : "GENERAL_ADMISSION";

    const navigateToReservations = () => {
        navigate({
            to: "/account/profile?activeTab=reservations",
            level: "log",
            component: ShowingInfoPageContent.name,
            message: "User successfully reserved tickets; redirecting to dashboard.",
        });
    };

    return (
        <PageFlexWrapper>
            <ShowingInfoPageHeader showing={showing}/>

            <div className="flex justify-center">
                <ShowingSelectorInfoCard
                    showing={showing}
                    className="w-full md:w-2/3 xl:w-1/3"
                />
            </div>

            <section className="space-y-4">
                <PageSectionHeader text="Ticket Selection"/>

                {/* Form orchestrator handling both GA and Reserved Seating logic */}
                <ReservationForm
                    showingID={showing._id}
                    reservationType={reservationType}
                    currency="USD"
                    onSubmitConfig={{onSubmitSuccess: navigateToReservations}}
                >
                    <ReservationFormView reservationType={reservationType}/>
                </ReservationForm>
            </section>

        </PageFlexWrapper>
    );
}
/**
 * @file Presentational content layer for the Showing Details page.
 * @filename ShowingInfoPageContent.tsx
 */

import PageFlexWrapper from "@/views/common/_comp/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {formatShowingInfo} from "@/domains/showings/utilities/formatShowingInfo.ts";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import buildString from "@/common/utility/buildString.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ReservationFormContainer} from "@/views/client/reservations/components/reserve-ticket-form";

/**
 * Props for the {@link ShowingInfoPageContent} component.
 */
type ContentProps = {
    /** The validated and fully populated showing entity retrieved from the API. */
    showing: ShowingDetails;
};

/**
 * Renders formatted showing metadata and the interactive ticket reservation workflow.
 */
const ShowingInfoPageContent = (
    {showing}: ContentProps
) => {
    /** Hook for navigation that automatically logs transition events to the backend. */
    const navigate = useLoggedNavigate();

    /** Deconstructs domain logic into display-ready strings. */
    const {
        reservationType,
        movieTitle,
        formattedStartTime,
        formattedRunTime,
        theatreName,
    } = formatShowingInfo(showing);

    /** Combines metadata parts into a single bullet-separated line. */
    const metaString = buildString(
        [formattedRunTime, formattedStartTime, theatreName],
        " • ",
    );

    /** Callback triggered after a successful reservation mutation. */
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
            <header>
                <HeaderTitle>{movieTitle}</HeaderTitle>
                <HeaderDescription>{metaString}</HeaderDescription>
            </header>

            <section className="space-y-4">
                <SectionHeader>Ticket Selection</SectionHeader>

                {/* Form orchestrator handling both GA and Reserved Seating logic */}
                <ReservationFormContainer
                    showingID={showing._id}
                    reservationType={reservationType}
                    currency="USD"
                    onSubmitSuccess={navigateToReservations}
                />
            </section>
        </PageFlexWrapper>
    );
};

export default ShowingInfoPageContent;
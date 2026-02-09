/**
 * @file ShowingInfoPageContent.tsx
 *
 * Primary content renderer for a showing details page.
 *
 * Responsibilities:
 * - Present formatted showing metadata
 * - Initialize ticket selection flow
 * - Handle post-reservation navigation
 *
 * @remarks
 * - Reservation flow behavior is delegated to form containers
 * - Navigation events are logged for traceability
 */

import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {formatShowingInfo} from "@/pages/showings/utilities/formatShowingInfo.ts";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import buildString from "@/common/utility/buildString.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import ShowingTicketSelectorFormContainer
    from "@/pages/reservation/components/forms/ticket-selectors/ShowingTicketSelectorFormContainer.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Props for {@link ShowingInfoPageContent}.
 */
type ContentProps = {
    /** Fully populated showing details */
    showing: ShowingDetails;
};

/**
 * Renders showing metadata and the ticket reservation workflow.
 *
 * @param showing - Showing being reserved
 */
const ShowingInfoPageContent = (
    {showing}: ContentProps
) => {
    const navigate = useLoggedNavigate();

    const {
        reservationType,
        movieTitle,
        formattedStartTime,
        formattedRunTime,
        theatreName,
    } = formatShowingInfo(showing);

    const metaString = buildString(
        [formattedRunTime, formattedStartTime, theatreName],
        " • ",
    );

    const navigateToReservations = () => {
        navigate({
            to: "/account/profile?activeTab=reservations",
            level: "log",
            component: ShowingInfoPageContent.name,
            message: "Navigate to user's reservations after creation.",
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

                <ShowingTicketSelectorFormContainer
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

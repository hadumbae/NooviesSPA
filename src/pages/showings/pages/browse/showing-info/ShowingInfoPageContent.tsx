import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {formatShowingInfo} from "@/pages/showings/utilities/formatShowingInfo.ts";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import buildString from "@/common/utility/buildString.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import ShowingTicketSelector from "@/pages/reservation/components/ticket-selector/ShowingTicketSelector.tsx";

type ContentProps = {
    showing: ShowingDetails;
}

const ShowingInfoPageContent = (
    {showing}: ContentProps
) => {
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

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{movieTitle}</HeaderTitle>
                <HeaderDescription>{metaString}</HeaderDescription>
            </header>

            <section>
                <SectionHeader>Ticket Selection</SectionHeader>
                <ShowingTicketSelector
                    showing={showing}
                    reservationType={reservationType}
                />
            </section>
        </PageFlexWrapper>
    );
};

export default ShowingInfoPageContent;

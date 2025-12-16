/**
 * @file ShowingDetailsCard.tsx
 *
 * @summary
 * Presentation card for displaying high-level showing details.
 *
 * @description
 * Renders a structured overview of a {@link ShowingDetails} entity, including:
 * - Movie, theatre, and screen references (with admin links)
 * - Start/end date and time
 * - Spoken and subtitle languages
 * - Pricing and status metadata
 *
 * This component is purely presentational and assumes all data
 * has already been normalized for display (e.g., Luxon DateTime objects).
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import {ISO6391LanguageCode} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

/**
 * Props for {@link ShowingDetailsCard}.
 */
type CardProps = {
    /**
     * Fully-resolved showing details to display.
     */
    showing: ShowingDetails;
};

/**
 * Displays a detailed summary card for a showing.
 *
 * @remarks
 * - Uses {@link DetailsCardSpan} for consistent label/value layout
 * - Includes screen-reader-only section headers for accessibility
 * - Generates admin navigation links for related entities
 *
 * @param props - Component props
 *
 * @returns
 * A card displaying formatted showing information.
 */
const ShowingDetailsCard = ({showing}: CardProps) => {
    // --- Showing Details ---
    const {
        movie,
        screen,
        theatre,
        startTime,
        endTime,
        ticketPrice,
        language,
        subtitleLanguages,
        isActive,
        isSpecialEvent
    } = showing;

    // --- Date And Time ---
    const formattedStartTime = startTime.toFormat("dd MMM, yyyy hh:mm");
    const formattedEndTime = endTime
        ? endTime.toFormat("dd MMM, yyyy hh:mm")
        : "Unspecified";

    // --- Languages ---
    const formattedLanguage = ISO6391LanguageConstant[language];
    const formattedSubtitles =
        subtitleLanguages
            .map((sub: ISO6391LanguageCode) => ISO6391LanguageConstant[sub])
            .join(", ") || "None";

    // --- References ---
    const {_id: movieID, title: movieTitle} = movie;
    const {_id: screenID, name: screenName} = screen;
    const {_id: theatreID, name: theatreName} = theatre;

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-6">
                <section className="flex justify-between items-center flex-wrap">
                    <SectionHeader srOnly>Showing Movie Details</SectionHeader>
                    <DetailsCardSpan label="Movie" text={movieTitle} to={`/admin/movies/get/${movieID}`}/>
                </section>

                <section>
                    <SectionHeader srOnly>Showing Theatre Details</SectionHeader>
                    <div className="flex space-x-5 items-center">
                        <DetailsCardSpan label="Screen" text={screenName} to={`/admin/screens/get/${screenID}`}/>
                        <DetailsCardSpan label="Theatre" text={theatreName} to={`/admin/theatres/get/${theatreID}`}/>
                    </div>
                </section>

                <section className="grid grid-cols-2 gap-2">
                    <SectionHeader srOnly>Showing Date & Time</SectionHeader>
                    <DetailsCardSpan label="Start Time" text={formattedStartTime}/>
                    <DetailsCardSpan label="End Time" text={formattedEndTime}/>
                </section>

                <section className="grid grid-cols-3 gap-2">
                    <SectionHeader srOnly>Showing Languages</SectionHeader>
                    <DetailsCardSpan label="Language" text={formattedLanguage}/>
                    <div className="col-span-2">
                        <DetailsCardSpan label="Subtitles" text={formattedSubtitles}/>
                    </div>
                </section>

                <section className="grid grid-cols-3 gap-2">
                    <SectionHeader srOnly>Showing Metadata</SectionHeader>
                    <DetailsCardSpan label="Base Price" text={`$${ticketPrice}`}/>
                    <DetailsCardSpan label="Is Active?" text={isActive ? "Yes" : "No"}/>
                    <DetailsCardSpan label="Is Special Event?" text={isSpecialEvent ? "Yes" : "No"}/>
                </section>
            </CardContent>
        </Card>
    );
};

export default ShowingDetailsCard;

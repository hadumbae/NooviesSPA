/**
 * @file ShowingInfoCompactListCard.tsx
 *
 * Compact list-style card for displaying key Showing information.
 *
 * @remarks
 * Designed for dense browsing views (e.g. showing lists, search results).
 * Uses {@link formatShowingInfo} to transform domain data into
 * UI-ready display fields.
 *
 * Responsibilities:
 * - Display movie poster and title
 * - Show runtime, format type, language, and subtitles
 * - Present localized showing start time
 * - Provide navigation to movie and showing detail pages
 */

import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {IconTextCSS} from "@/common/constants/css/TextCSS.ts";
import {TvMinimal} from "lucide-react";
import {formatShowingInfo} from "@/pages/showings/utilities/formatShowingInfo.ts";
import TheatreShowingSelectSummary
    from "@/pages/theatres/components/client/forms/browse-list/TheatreShowingSelectSummary.tsx";

/**
 * Props for {@link ShowingInfoCompactListCard}.
 */
type CardProps = {
    /** Full showing details used to derive display information. */
    showing: ShowingDetails;
};

/**
 * Renders a compact card summarizing a
 * single Showing for client side browsing.
 *
 * @param props - Component props.
 * @returns A compact, interactive card suitable for list views.
 */
const ShowingInfoCompactListCard = ({showing}: CardProps) => {
    const {
        theatre: {name: theatreName, slug: theatreSlug},
        screen: {name: screenName},
    } = showing;

    return (
        <Card>
            <CardHeader className="py-4">
                <CardTitle>
                    <LoggedLink
                        to={`/browse/theatres/${theatreSlug}`}
                        className="hover:underline underline-offset-4"
                    >
                        {theatreName}
                    </LoggedLink>
                </CardTitle>
                <CardDescription className={IconTextCSS}>
                    <TvMinimal /> {screenName}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
                <TheatreShowingSelectSummary showing={showing} />
            </CardContent>
        </Card>
    );
};

export default ShowingInfoCompactListCard;

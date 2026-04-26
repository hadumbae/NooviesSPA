/**
 * @file List-optimized card for showing previews.
 * @filename ShowingInfoCompactListCard.tsx
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/ui/card.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import { IconTextCSS } from "@/common/constants/css/TextCSS.ts";
import { TvMinimal } from "lucide-react";
import TheatreShowingSelectSummary
    from "@/views/client/theatres/_comp/browse-theatres/TheatreShowingSelectSummary.tsx";
import { ShowingDetails } from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import { PopulatedShowing } from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";

/**
 * Props for {@link ShowingInfoCompactListCard}.
 */
type CardProps = {
    /** {@link PopulatedShowing} | {@link ShowingDetails} */
    showing: PopulatedShowing | ShowingDetails;
};

/**
 * Minimal card delegating showing details to {@link TheatreShowingSelectSummary}.
 */
const ShowingInfoCompactListCard = ({ showing }: CardProps) => {
    const {
        theatre: { name: theatreName, slug: theatreSlug },
        screen: { name: screenName },
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
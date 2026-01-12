import { ShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import buildString from "@/common/utility/buildString.ts";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {
    BadgeAlert,
    Circle,
    Cog,
    DollarSign,
    Search,
    Theater,
    TvMinimal,
} from "lucide-react";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import IconTextSpan from "@/common/components/card-content/IconTextSpan.tsx";
import { cn } from "@/common/lib/utils.ts";
import { RoundedBorderCSS } from "@/common/constants/css/ContainerCSS.ts";

type CardProps = {
    /** Fully populated showing details */
    showing: ShowingDetails;
};

/**
 * Administrative card displaying a single movie showing.
 *
 * @remarks
 * - Shows formatted time metadata and runtime.
 * - Displays pricing, status, activity, and special-event flags.
 * - Provides quick navigation to showing, theatre, and screen admin pages.
 *
 * Designed for dense overview lists in admin dashboards.
 */
const ShowingSummaryCard = ({ showing }: CardProps) => {
    const {
        _id,
        movie,
        theatre,
        screen,
        startTime,
        endTime,
        ticketPrice,
        isSpecialEvent,
        isActive,
        status,
    } = showing;

    const { runtime } = movie;
    const { _id: theatreID, name: theatreName, slug: theatreSlug } = theatre;
    const { _id: screenID, name: screenName, screenType } = screen;

    // --- Formatted Strings ---

    const formattedStatus = convertToTitleCase(status);
    const formattedRuntime = formatMovieRuntime(runtime);
    const formattedStartTime = startTime.toFormat("MMM dd, yyyy (hh:mm)");
    const formattedTimeMetadata = buildString(
        [endTime?.toFormat("MMM dd, yyyy (hh:mm)"), formattedRuntime],
        " • "
    );

    return (
        <Card>
            <CardContent className="px-5 py-3 space-y-3">
                {/* Header */}

                <div className="flex justify-between items-center">
                    <section>
                        <PrimaryHeaderText as="h2">
                            {formattedStartTime}
                        </PrimaryHeaderText>
                        <SecondaryHeaderText as="h3" className="text-xs">
                            {formattedTimeMetadata}
                        </SecondaryHeaderText>
                    </section>

                    <div>
                        <LoggedLink to={`/admin/showings/get/${_id}`}>
                            <IconButton>
                                <Search />
                            </IconButton>
                        </LoggedLink>
                    </div>
                </div>

                {/* Metadata */}

                <div className={cn(RoundedBorderCSS, "grid grid-cols-2 gap-1 p-2 select-none")}>
                    <IconTextSpan className={cn(RoundedBorderCSS, "px-2")}>
                        <DollarSign /> {ticketPrice}
                    </IconTextSpan>

                    <IconTextSpan className={cn(RoundedBorderCSS, "px-2")}>
                        <Cog /> {formattedStatus}
                    </IconTextSpan>

                    <IconTextSpan className={cn(RoundedBorderCSS, "px-2")}>
                        <BadgeAlert /> {isSpecialEvent ? "Special" : "Normal"} Event
                    </IconTextSpan>

                    <IconTextSpan className={cn(RoundedBorderCSS, "px-2")}>
                        <Circle /> {isActive ? "Active" : "Inactive"}
                    </IconTextSpan>
                </div>

                {/* Links */}

                <div className="flex justify-between">
                    <LoggedHoverLink
                        to={`/admin/theatres/get/${theatreSlug}`}
                        className="text-xs"
                    >
                        <Theater /> {theatreName}
                    </LoggedHoverLink>

                    <LoggedHoverLink
                        to={`/admin/theatres/get/${theatreID}/screen/${screenID}`}
                        className="text-xs"
                    >
                        <TvMinimal /> {screenName} ({screenType})
                    </LoggedHoverLink>
                </div>
            </CardContent>
        </Card>
    );
};

export default ShowingSummaryCard;

import { FC } from "react";
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import { ShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import formatShowingDetails from "@/pages/showings/utilities/formatShowingDetails.ts";
import { Circle, Cog, DollarSign, Star } from "lucide-react";
import LucideIconText from "@/common/components/card-content/LucideIconText.tsx";
import { cn } from "@/common/lib/utils.ts";

/**
 * Props for the {@link ShowingIndexListCard} component.
 *
 * @property showing - The full showing details to display, including movie, theatre, and timing info.
 */
type ShowingIndexListCardProps = {
    showing: ShowingDetails;
};

/**
 * **ShowingIndexListCard**
 *
 * Displays a summary card for a movie showing in the admin Showings index page.
 *
 * @description
 * The card presents concise showing details such as:
 * - Movie title and release year
 * - Theatre and screen names
 * - Showing schedule and language information
 * - Ticket price and operational status
 *
 * Special events are indicated by a green star icon.
 *
 * @example
 * ```tsx
 * <ShowingIndexListCard showing={showingData} />
 * ```
 */
const ShowingIndexListCard: FC<ShowingIndexListCardProps> = ({ showing }) => {
    const { isSpecialEvent, ticketPrice, isActive } = showing;

    const {
        movieTitle,
        screenName,
        theatreName,
        releaseYear,
        dateString,
        languageString,
        formattedStatus,
    } = formatShowingDetails(showing);

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-4">
                {/* Header: Movie title and theatre info */}
                <section className="space-y-1 justify-start">
                    <div className="flex justify-between items-center">
                        <h1 className="font-extrabold">
                            {movieTitle} ({releaseYear})
                        </h1>
                        {isSpecialEvent && <Star className="text-green-500" size={20} />}
                    </div>

                    <h2 className="text-sm text-neutral-600 text-left">
                        {screenName} | {theatreName}
                    </h2>
                </section>

                {/* Schedule and language */}
                <section className="flex justify-between items-center">
                    <h3 className="text-xs text-neutral-400">{dateString}</h3>
                    <h3 className="text-xs text-neutral-400">{languageString}</h3>
                </section>

                {/* Status and meta info */}
                <section className="flex justify-center space-x-5">
                    <LucideIconText
                        icon={DollarSign}
                        text={ticketPrice.toString()}
                        className="text-neutral-400 text-sm"
                    />

                    <LucideIconText
                        icon={Cog}
                        text={formattedStatus}
                        className="text-neutral-400 text-sm"
                    />

                    <LucideIconText
                        icon={Circle}
                        text={isActive ? "Active" : "Inactive"}
                        className={cn(
                            "text-neutral-400 text-sm",
                            isActive ? "text-green-500" : "text-red-500"
                        )}
                    />
                </section>
            </CardContent>
        </Card>
    );
};

export default ShowingIndexListCard;

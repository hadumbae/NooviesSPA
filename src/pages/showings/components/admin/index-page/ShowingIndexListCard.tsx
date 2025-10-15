import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";

/**
 * Props for {@link ShowingIndexListCard}.
 */
type ListCardProps = {
    /**
     * The showing details to display in the list card.
     * Includes movie, theatre, and timing information.
     */
    showing: ShowingDetails;
};

/**
 * Displays a card summarizing a movie showing in the admin Showings index page.
 *
 * @description
 * The card presents essential showing details including:
 * - Movie title and release year
 * - Theatre and screen names
 * - Start and end times (formatted for readability)
 * - A quick navigation button to the seating layout page
 *
 * It also links the movie title to the showing’s detailed admin page.
 *
 * @example
 * ```tsx
 * <ShowingIndexListCard showing={showingData} />
 * ```
 */
const ShowingIndexListCard: FC<ListCardProps> = ({showing}) => {
    const {_id, startTime, endTime, movie, theatre, screen} = showing;

    const {name: theatreName} = theatre;
    const {name: screenName} = screen;
    const {title: movieTitle, releaseDate} = movie;

    const movieReleaseDate = releaseDate && format(releaseDate, "yyyy");
    const startingTime = format(startTime, "dd MMM hh:mm");
    const endingTime = endTime ? format(endTime, "dd MMM hh:mm") : undefined;

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-3">
                {/* Title and release year */}
                <Link
                    to={`/admin/showings/get/${_id}`}
                    className="text-lg font-extrabold hover:underline"
                >
                    {movieTitle} ({movieReleaseDate})
                </Link>

                {/* Screen and theatre */}
                <span>{screenName} | {theatreName}</span>

                {/* Showtimes and seating link */}
                <div className="flex justify-between items-center">
                    <span className="text-[12px] text-neutral-500">
                        {startingTime} {endingTime && ` | ${endingTime}`}
                    </span>

                    <ButtonLink
                        to={`/admin/showings/get/${showing._id}/seating`}
                        size="sm"
                        className="text-neutral-400 hover:text-black"
                    >
                        Seating
                    </ButtonLink>
                </div>
            </CardContent>
        </Card>
    );
};

export default ShowingIndexListCard;

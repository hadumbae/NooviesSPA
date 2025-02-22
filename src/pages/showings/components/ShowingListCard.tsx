import {FC} from 'react';
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import ShowingOptions from "@/pages/showings/components/ShowingOptions.tsx";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import HoverLink from "@/common/components/navigation/HoverLink.tsx";
import useValidatePopulatedShowing from "@/pages/showings/hooks/validation/useValidatePopulatedShowing.ts";

interface Props {
    showing: Showing;
    onShowingDelete: () => void;
}

const ShowingListCard: FC<Props> = ({showing, onShowingDelete}) => {
    const populatedShowing = useValidatePopulatedShowing({showing});
    const {_id, startTime, endTime, movie, theatre, screen} = populatedShowing!;

    const {name: theatreName} = theatre;
    const {name: screenName} = screen;
    const {title: movieTitle, releaseDate} = movie;

    const movieReleaseDate = format(releaseDate, "yyyy");
    const startingTime = format(startTime, "dd MMM hh:mm");
    const endingTime = endTime ? format(endTime, "dd MMM hh:mm") : undefined;

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                    <Link
                        to={`/admin/showings/get/${_id}`}
                        className="text-lg font-extrabold hover:underline"
                    >
                        {movieTitle} ({movieReleaseDate})
                    </Link>

                    <ShowingOptions
                        showing={showing}
                        onDelete={onShowingDelete}
                        variant="outline"
                    />
                </div>

                <span>{screenName} | {theatreName}</span>

                <div className="flex justify-between items-center">
                    <span className="text-[12px] text-neutral-500">
                        {startingTime} {endingTime && ` | ${endingTime}`}
                    </span>

                    <HoverLink
                        to={`/admin/showings/get/${showing._id}/seating`}
                        className="text-[12px] text-neutral-500"
                    >
                        Seating
                    </HoverLink>
                </div>


            </CardContent>
        </Card>
    );
};

export default ShowingListCard;

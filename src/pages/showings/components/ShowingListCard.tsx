import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import ShowingOptions from "@/pages/showings/components/ShowingOptions.tsx";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {PopulatedShowing} from "@/pages/showings/schema/populated/ShowingPopulatedSchema.ts";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";

interface Props {
    showing: PopulatedShowing;
    onShowingDelete: () => void;
}

const ShowingListCard: FC<Props> = ({showing, onShowingDelete}) => {
    const {_id, startTime, endTime, movie, theatre, screen} = showing;

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
                        variant="link"
                        className="text-neutral-400 hover:text-black"
                    />
                </div>

                <span>{screenName} | {theatreName}</span>

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

export default ShowingListCard;

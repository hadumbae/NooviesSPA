import {FC} from 'react';
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {format} from "date-fns";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import useValidatePopulatedShowing from "@/pages/showings/hooks/validation/useValidatePopulatedShowing.ts";

interface Props {
    showing: Showing;
}

const ShowingDetailsCard: FC<Props> = ({showing}) => {
    const {startTime, endTime, ticketPrice, language, subtitleLanguages, isSpecialEvent} = showing;
    const {movie, screen, theatre} = useValidatePopulatedShowing(showing);

    const {_id: movieID, title: movieTitle} = movie;
    const {_id: screenID, name: screenName} = screen;
    const {_id: theatreID, name: theatreName} = theatre;

    const formattedStartTime = format(startTime, "dd MMM, yyyy hh:mm");
    const formattedEndTime = endTime ? format(endTime, "dd MMM, yyyy hh:mm") : "Unspecified";

    const subtitles = subtitleLanguages.join(", ") || "None";

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                    <DetailsCardSpan label="Movie" text={movieTitle} to={`/admin/movies/get/${movieID}`} />
                </div>

                <div className="flex space-x-5 items-center">
                    <DetailsCardSpan label="Screen" text={screenName} to={`/admin/screens/get/${screenID}`} />
                    <DetailsCardSpan label="Theatre" text={theatreName} to={`/admin/theatres/get/${theatreID}`} />
                </div>

                <div className="flex justify-between items-center">
                    <DetailsCardSpan label="Start Time" text={formattedStartTime} />
                    <DetailsCardSpan label="End Time" text={formattedEndTime} />
                    <DetailsCardSpan label="Base Price" text={`$${ticketPrice}`} />
                </div>

                <div className="flex space-x-5 items-center">
                    <DetailsCardSpan label="Language" text={language} />
                    <DetailsCardSpan label="Subtitles" text={subtitles} />
                </div>

                <div className="flex space-x-5 items-center">
                    <DetailsCardSpan label="Is Special Event?" text={isSpecialEvent ? "Yes" : "No"} />
                </div>
            </CardContent>
        </Card>
    );
};

export default ShowingDetailsCard;

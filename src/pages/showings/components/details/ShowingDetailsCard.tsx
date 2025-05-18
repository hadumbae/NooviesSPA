import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {format} from "date-fns";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {PopulatedShowing} from "@/pages/showings/schema/populated/ShowingPopulatedSchema.ts";

interface Props {
    showing: PopulatedShowing;
}

const ShowingDetailsCard: FC<Props> = ({showing}) => {
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

    const {_id: movieID, title: movieTitle} = movie;
    const {_id: screenID, name: screenName} = screen;
    const {_id: theatreID, name: theatreName} = theatre;

    const formattedStartTime = format(startTime, "dd MMM, yyyy hh:mm");
    const formattedEndTime = endTime ? format(endTime, "dd MMM, yyyy hh:mm") : "Unspecified";

    const subtitles = subtitleLanguages.join(", ") || "None";

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-6">
                <section className="flex justify-between items-center">
                    <DetailsCardSpan label="Movie" text={movieTitle} to={`/admin/movies/get/${movieID}`}/>
                </section>

                <section className="flex space-x-5 items-center">
                    <DetailsCardSpan label="Screen" text={screenName} to={`/admin/screens/get/${screenID}`}/>
                    <DetailsCardSpan label="Theatre" text={theatreName} to={`/admin/theatres/get/${theatreID}`}/>
                </section>

                <section className="flex justify-between items-center">
                    <DetailsCardSpan label="Start Time" text={formattedStartTime}/>
                    <DetailsCardSpan label="End Time" text={formattedEndTime}/>
                    <DetailsCardSpan label="Base Price" text={`$${ticketPrice}`}/>
                </section>

                <section className="flex space-x-5 items-center">
                    <DetailsCardSpan label="Language" text={language}/>
                    <DetailsCardSpan label="Subtitles" text={subtitles}/>
                </section>

                <section className="flex space-x-5 items-center">
                    <DetailsCardSpan label="Is Active?" text={isActive ? "Yes" : "No"}/>
                    <DetailsCardSpan label="Is Special Event?" text={isSpecialEvent ? "Yes" : "No"}/>
                </section>
            </CardContent>
        </Card>
    );
};

export default ShowingDetailsCard;

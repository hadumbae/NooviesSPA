import {FC} from 'react';
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/common/components/ui/accordion.tsx";
import {ShowingWithMovie} from "@/pages/showings/schema/populated/ShowingWithMovieSchema.ts";
import {format} from "date-fns";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";

interface Props {
    value: string
    showing: ShowingWithMovie;
}

const TheatreScreenShowingAccordionItem: FC<Props> = ({value, showing}) => {
    const {_id: showingID, movie, startTime, ticketPrice, isSpecialEvent} = showing;
    const {_id: movieID, title, releaseDate} = movie;

    const movieReleaseDate = format(releaseDate, "yyyy");
    const isSpecial = isSpecialEvent ? "Yes" : "No";

    const startingTime = format(startTime, "dd MMM, yy (hh:mm)");

    return (
        <AccordionItem value={value}>
            <AccordionTrigger className="py-2 flex justify-between">
                <span className="max-w-72">{title} ({movieReleaseDate})</span>
                <span>{startingTime}</span>
            </AccordionTrigger>
            <AccordionContent className="border p-3 rounded-xl space-y-5">
                <section className="flex justify-between items-center">
                    <DetailsCardSpan label="Showing" text="Link" to={`/admin/showings/get/${showingID}`}/>
                    <DetailsCardSpan label="Movie" text="Link" to={`/admin/movies/get/${movieID}`}/>
                    <DetailsCardSpan label="Ticket Price" text={`$${ticketPrice}`}/>
                    <DetailsCardSpan label="Special Event" text={isSpecial}/>
                </section>
            </AccordionContent>
        </AccordionItem>
    );
};

export default TheatreScreenShowingAccordionItem;

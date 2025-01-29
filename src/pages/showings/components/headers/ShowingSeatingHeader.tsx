import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import {format} from "date-fns";
import useValidatePopulatedShowing from "@/pages/showings/hooks/validation/useValidatePopulatedShowing.ts";

interface Props {
    showing: Showing;
}

const ShowingSeatingHeader: FC<Props> = ({showing}) => {
    const {movie, screen, theatre} = useValidatePopulatedShowing(showing);

    const {title: movieTitle, releaseDate} = movie;
    const {name: screenName} = screen;
    const {name: theatreName} = theatre;

    const formattedDate = format(releaseDate, "yyyy");

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Seating For {movieTitle} ({formattedDate})</HeaderTitle>
                <HeaderDescription>{screenName} | {theatreName}</HeaderDescription>
            </div>
        </header>
    );
};

export default ShowingSeatingHeader;

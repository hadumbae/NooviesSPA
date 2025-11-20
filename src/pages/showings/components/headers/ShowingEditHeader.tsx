import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Search} from "lucide-react";
import useValidatePopulatedShowing from "@/pages/showings/hooks/validation/useValidatePopulatedShowing.ts";
import {cn} from "@/common/lib/utils.ts";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";

interface Props {
    /**
     * The showing data object containing details about the movie, screen, and theatre.
     */
    showing: Showing;
}

/**
 * Renders the header section for the showing edit page.
 *
 * @param showing - The showing data to be displayed in the header.
 *
 * @returns
 * This component displays the movie title and a description indicating the screen and theatre
 * where the showing is scheduled. It also includes a link to view detailed information about the showing.
 *
 * @remarks
 * This component displays the movie title and a description indicating the screen and theatre
 * where the showing is scheduled. It also includes a link to view detailed information about the showing.
 *
 */
const ShowingEditHeader: FC<Props> = ({showing}) => {
    const {_id, movie, screen, theatre} = useValidatePopulatedShowing(showing);

    const {title: movieTitle} = movie;
    const {name: screenName} = screen;
    const {name: theatreName} = theatre;

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col max-md:space-y-3",
            "md:justify-between md:items-center",
        )}>
            <section>
                <HeaderTitle>Edit {movieTitle}</HeaderTitle>
                <HeaderDescription>Edit showing on {screenName} at {theatreName}.</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <LoggedLink to={`/admin/showings/get/${_id}`}>
                    <Search/> Back To Showing
                </LoggedLink>
            </section>
        </header>
    );
};

export default ShowingEditHeader;

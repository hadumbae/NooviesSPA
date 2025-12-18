/**
 * Showing Edit Header
 *
 * Renders the header section for the showing edit page, displaying
 * the movie title and contextual information about the screen and theatre.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";

type HeaderProps = {
    /** Fully populated showing used to build the header content */
    showing: ShowingDetails;
};

/**
 * Header component for the showing edit page.
 *
 * @param props - Component props
 * @param props.showing - Populated showing details
 */
const ShowingEditHeader = ({showing}: HeaderProps) => {
    const {
        movie: {title: movieTitle},
        screen: {name: screenName},
        theatre: {name: theatreName},
    } = showing;

    return (
        <header>
            <HeaderTitle>Edit {movieTitle}</HeaderTitle>
            <HeaderDescription>
                Edit showing on {screenName} at {theatreName}.
            </HeaderDescription>
        </header>
    );
};

export default ShowingEditHeader;

/**
 * @fileoverview Header component for the showing information page displaying movie and showtime details.
 */

import {ReactElement} from "react";
import {ShowingDetails} from "@/domains/showings";
import {HeaderDescription, HeaderTitle} from "@/views/common/_comp/page-headers";

/** Props for the ShowingInfoPageHeader component. */
type HeaderProps = {
    showing: ShowingDetails;
};

/**
 * Renders the movie title, release year, runtime, and formatted showtime for a specific showing.
 */
export function ShowingInfoPageHeader(
    {showing}: HeaderProps
): ReactElement {
    const {movie, theatre, startTime} = showing;
    const {name: theatreName, location: {timezone}} = theatre;
    const {title: movieTitle, releaseDate} = movie;

    const releaseYear = releaseDate ? releaseDate.toFormat("yyyy") : null;
    const showtime = startTime.setZone(timezone).toFormat("dd MMM yy, hh:mm a");

    return (
        <header>
            <HeaderTitle>
                {movieTitle} {releaseYear && `(${releaseYear})}`}
            </HeaderTitle>
            <HeaderDescription className="line-clamp-1">
                {showtime} • {theatreName}
            </HeaderDescription>
        </header>
    );
}
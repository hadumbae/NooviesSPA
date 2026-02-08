import {ReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import buildString from "@/common/utility/buildString.ts";
import buildShowingDateString from "@/pages/showings/utilities/buildShowingDateString.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";

export function formatReservationDetails(reservation: ReservationDetails) {
    const {_id, status, showing, reservationType, ticketCount, pricePaid} = reservation;
    const {movie, theatre, startTime, endTime} = showing;
    const {location: {timezone}} = theatre;
    const {title, releaseDate, posterImage, runtime} = movie;

    const formattedReleaseDate = releaseDate?.toFormat("yyyy") || "Unreleased";
    const formattedReservationType = convertToTitleCase(reservationType.replace("_", " "));
    const formattedMovieTitle = buildString([title, releaseDate && `(${formattedReleaseDate})`]);
    const formattedShowTime = buildShowingDateString({start: startTime, end: endTime, timezone});
    const formattedRuntime = formatMovieRuntime(runtime, true);

    return {
        _id,
        status,
        reservationType,
        title,
        releaseDate,
        startTime,
        endTime,
        ticketCount,
        pricePaid,
        posterImage,
        formatted: {
            movieTitle: formattedMovieTitle,
            movieReleaseDate: formattedReleaseDate,
            reservationType: formattedReservationType,
            showtime: formattedShowTime,
            runtime: formattedRuntime
        }
    }
}
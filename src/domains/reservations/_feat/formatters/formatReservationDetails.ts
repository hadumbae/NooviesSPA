/**
 * @fileoverview Utility for transforming raw Reservation data into UI-ready display formats.
 *
 */

import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {buildString} from "@/common/_feat/formatters/buildString.ts";
import {buildShowingDateString} from "@/domains/showings/_feat/formatters/buildShowingDateString.ts";
import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";
import {ObjectId} from "@/common/_schemas";
import {PopulatedReservation} from "@/domains/reservations/_schema/model/populated-reservations/PopulatedReservationSchema.ts";

/**
 * Reservation object enriched with human-readable strings and flattened identifiers for UI components.
 */
type FormattedReturns = PopulatedReservation & {
    _ids: {
        showingID: ObjectId;
        theatreID: ObjectId;
        movieID: ObjectId;
    },
    formatted: {
        movieTitle: string;
        movieReleaseDate: string;
        movieGenres: string;
        reservationType: string;
        showtime: string;
        runtime: string;
    }
}

/**
 * Transforms a populated Reservation entity into a structured object with displayable values.
 */
export function formatReservationDetails(reservation: PopulatedReservation): FormattedReturns {
    const {showing} = reservation;
    const {_id: showingID, movie, theatre, startTime, endTime} = showing;
    const {_id: theatreID, location: {timezone}} = theatre;
    const {_id: movieID, title, releaseDate, runtime, genres: movieGenres} = movie;

    const formattedReleaseDate = releaseDate?.toFormat("yyyy") || "Unreleased";
    const formattedMovieTitle = buildString([title, releaseDate && `(${formattedReleaseDate})`]);
    const formattedRuntime = formatMovieRuntime(runtime, true);
    const formattedGenreString = buildString(movieGenres.map(g => g.name), " • ");

    const formattedReservationType = convertToTitleCase(reservation.reservationType.replace("_", " "));
    const formattedShowTime = buildShowingDateString({start: startTime, end: endTime, timezone});

    return {
        ...reservation,
        _ids: {
            showingID,
            theatreID,
            movieID,
        },
        formatted: {
            movieTitle: formattedMovieTitle,
            movieReleaseDate: formattedReleaseDate,
            movieGenres: formattedGenreString,
            reservationType: formattedReservationType,
            showtime: formattedShowTime,
            runtime: formattedRuntime
        }
    }
}
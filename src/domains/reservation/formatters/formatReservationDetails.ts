/**
 * @file Utility for transforming raw Reservation data into UI-ready display formats.
 * @filename formatReservationDetails.ts
 */

import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import buildString from "@/common/utility/buildString.ts";
import buildShowingDateString from "@/domains/showings/utilities/buildShowingDateString.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PopulatedReservation} from "@/domains/reservation/schema/model/reservation/PopulatedReservationSchema.ts";

/**
 * Extended Reservation object containing derived human-readable strings and flattened identifiers.
 */
type FormattedReturns = PopulatedReservation & {
    /** Flattened ObjectIDs for easier access in nested components or routing. */
    _ids: {
        showingID: ObjectId;
        theatreID: ObjectId;
        movieID: ObjectId;
    },
    /** Pre-formatted strings tailored for labels, headers, and metadata spans. */
    formatted: {
        /** The movie title, optionally suffixed with the release year (e.g., "Inception (2010)"). */
        movieTitle: string;
        /** The four-digit release year or "Unreleased". */
        movieReleaseDate: string;
        /** Bullet-separated list of genres (e.g., "Sci-Fi • Action"). */
        movieGenres: string;
        /** Title-cased version of the enum (e.g., "Reserved Seats"). */
        reservationType: string;
        /** A comprehensive date-time string including timezone context. */
        showtime: string;
        /** Formatted duration (e.g., "2h 15m"). */
        runtime: string;
    }
}

/**
 * Maps a populated Reservation entity to a structured object containing displayable values.
 * @param reservation - The source entity, expected to be fully populated.
 * @returns The original reservation data enriched with a `formatted` property and a flattened `_ids` map.
 */
export function formatReservationDetails(reservation: PopulatedReservation): FormattedReturns {
    /** 1. Destructure the populated tree for processing. */
    const {showing} = reservation;
    const {_id: showingID, movie, theatre, startTime, endTime} = showing;
    const {_id: theatreID, location: {timezone}} = theatre;
    const {_id: movieID, title, releaseDate, runtime, genres: movieGenres} = movie;

    /** 2. Derive Movie-specific metadata. */
    const formattedReleaseDate = releaseDate?.toFormat("yyyy") || "Unreleased";
    const formattedMovieTitle = buildString([title, releaseDate && `(${formattedReleaseDate})`]);
    const formattedRuntime = formatMovieRuntime(runtime, true);
    const formattedGenreString = buildString(movieGenres.map(g => g.name), " • ");

    /** 3. Normalize Reservation and Showing metadata. */
    const formattedReservationType = convertToTitleCase(reservation.reservationType.replace("_", " "));
    const formattedShowTime = buildShowingDateString({start: startTime, end: endTime, timezone});

    /** 4. Return the composite object. */
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
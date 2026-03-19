/**
 * @file formatReservationDetails.ts
 * Maps a reservation entity to UI-ready display values.
 */

import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import buildString from "@/common/utility/buildString.ts";
import buildShowingDateString from "@/domains/showings/utilities/buildShowingDateString.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {ReservationStatus} from "@/domains/reservation/schema/enum/ReservationStatusEnumSchema.ts";
import {ReservationType} from "@/domains/reservation/schema/enum/ReservationTypeEnumSchema.ts";
import {DateTime} from "luxon";
import {CloudinaryImage} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import {PopulatedReservation} from "@/domains/reservation/schema/model/reservation/PopulatedReservationSchema.ts";

/**
 * Reservation details with derived display fields.
 */
type FormattedReturns = {
    _id: ObjectId;
    slug: SlugString;
    status: ReservationStatus;
    reservationType: ReservationType;
    title: string;
    releaseDate?: DateTime | null;
    startTime: DateTime;
    endTime?: DateTime | null;
    ticketCount: number;
    pricePaid: number;
    posterImage?: CloudinaryImage | null;
    isActive: boolean,
    isSpecialEvent?: boolean;
    canReserveSeats?: boolean,
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
 * @param reservation Source reservation entity.
 * @returns Reservation data enriched with formatted display fields.
 */
export function formatReservationDetails(reservation: PopulatedReservation): FormattedReturns {
    const {_id, slug, status, showing, reservationType, ticketCount, pricePaid} = reservation;
    const {_id: showingID, movie, theatre, startTime, endTime, config} = showing;
    const {isActive, isSpecialEvent, canReserveSeats} = config;
    const {_id: theatreID, location: {timezone}} = theatre;
    const {_id: movieID, title, releaseDate, posterImage, runtime, genres: movieGenres} = movie;

    const formattedReleaseDate = releaseDate?.toFormat("yyyy") || "Unreleased";
    const formattedMovieTitle = buildString([title, releaseDate && `(${formattedReleaseDate})`]);
    const formattedRuntime = formatMovieRuntime(runtime, true);
    const formattedGenreString = buildString(movieGenres.map(g => g.name), " • ");

    const formattedReservationType = convertToTitleCase(reservationType.replace("_", " "));
    const formattedShowTime = buildShowingDateString({start: startTime, end: endTime, timezone});

    return {
        _id,
        slug,
        status,
        reservationType,
        title,
        releaseDate,
        startTime,
        endTime,
        ticketCount,
        pricePaid,
        posterImage,
        isActive,
        isSpecialEvent,
        canReserveSeats,
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

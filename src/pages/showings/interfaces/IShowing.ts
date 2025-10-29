import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import ISeatMap from "@/pages/seatmap/interfaces/ISeatMap.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

/**
 * Represents a movie showing within a theatre.
 *
 * Includes scheduling details, pricing, language options, and references to related entities.
 */
export default interface IShowing {
    /**
     * Unique identifier for the showing.
     */
    readonly _id: ObjectId;

    /**
     * The scheduled start time of the showing.
     */
    startTime: Date;

    /**
     * The scheduled end time of the showing.
     * Can be null if the end time is not predetermined.
     */
    endTime?: Date | null;

    /**
     * The price of a ticket for the showing.
     */
    ticketPrice: number;

    /**
     * The primary language in which the movie is presented.
     */
    language: string;

    /**
     * A list of subtitle languages available for the showing.
     */
    subtitleLanguages: string[];

    /**
     * Indicates whether the showing is currently active and available for booking.
     */
    isActive?: boolean;

    /**
     * Indicates whether the showing is a special event (e.g., premiere, themed screening).
     */
    isSpecialEvent?: boolean;

    /**
     * Reference to the movie being shown.
     * Can be either the movie's ObjectId or the full IMovie object.
     */
    movie: ObjectId | IMovie;

    /**
     * Reference to the theatre where the showing takes place.
     * Can be either the theatre's ObjectId or the full ITheatre object.
     */
    theatre: ObjectId | Theatre;

    /**
     * Reference to the screen on which the movie is shown.
     * Can be either the screen's ObjectId or the full IScreen object.
     */
    screen: ObjectId | IScreen;

    /**
     * An array representing the seating arrangement for the showing.
     */
    seating: (ObjectId | ISeatMap)[];
}
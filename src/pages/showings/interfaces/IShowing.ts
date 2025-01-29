import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import ISeatMap from "@/pages/seatmap/interfaces/ISeatMap.ts";

export default interface IShowing {
    readonly _id: ObjectId,

    startTime: Date,
    endTime?: Date | null,
    ticketPrice: number,
    language: string,
    subtitleLanguages: string[],
    isSpecialEvent?: boolean,

    movie: ObjectId | IMovie,
    theatre: ObjectId | ITheatre,
    screen: ObjectId | IScreen,
    seating: (ObjectId | ISeatMap)[],
}
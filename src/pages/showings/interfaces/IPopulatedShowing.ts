import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import ISeatMap from "@/pages/seatmap/interfaces/ISeatMap.ts";

export default interface IPopulatedShowing {
    readonly _id: ObjectId,

    startTime: Date,
    endTime?: Date | null,
    ticketPrice: number,
    language: string,
    subtitleLanguages: string[],
    isSpecialEvent?: boolean,

    movie: IMovie,
    theatre: ITheatre,
    screen: IScreen,
    seating: ISeatMap[],
}
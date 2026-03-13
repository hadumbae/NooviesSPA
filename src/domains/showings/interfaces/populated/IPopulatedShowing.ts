import {IScreen} from "@/domains/screens/interfaces/IScreen.ts";
import IMovie from "@/domains/movies/interfaces/IMovie.ts";
import ISeatMap from "@/domains/seatmap/interfaces/ISeatMap.ts";
import IShowing from "@/domains/showings/interfaces/IShowing.ts";
import {Theatre} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";

export default interface IPopulatedShowing extends IShowing{
    movie: IMovie;
    theatre: Theatre;
    screen: IScreen;
    seating: ISeatMap[];
}
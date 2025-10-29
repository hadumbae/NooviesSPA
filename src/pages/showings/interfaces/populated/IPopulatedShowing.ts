import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import ISeatMap from "@/pages/seatmap/interfaces/ISeatMap.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

export default interface IPopulatedShowing extends IShowing{
    movie: IMovie;
    theatre: Theatre;
    screen: IScreen;
    seating: ISeatMap[];
}
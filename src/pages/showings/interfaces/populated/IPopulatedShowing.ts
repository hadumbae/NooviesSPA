import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import ISeatMap from "@/pages/seatmap/interfaces/ISeatMap.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";

export default interface IPopulatedShowing extends IShowing{
    movie: IMovie;
    theatre: ITheatre;
    screen: IScreen;
    seating: ISeatMap[];
}
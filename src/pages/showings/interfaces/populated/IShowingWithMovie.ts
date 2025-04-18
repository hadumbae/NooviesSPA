import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";

export default interface IShowingWithMovie extends IShowing{
    movie: IMovie;
}
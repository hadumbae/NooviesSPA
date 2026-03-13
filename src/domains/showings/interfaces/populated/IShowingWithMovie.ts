import IShowing from "@/domains/showings/interfaces/IShowing.ts";
import IMovie from "@/domains/movies/interfaces/IMovie.ts";

export default interface IShowingWithMovie extends IShowing{
    movie: IMovie;
}
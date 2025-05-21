import IMovie from "@/pages/movies/interfaces/IMovie.ts";

export default interface IFavouriteMovie extends IMovie {
    isFavourite: boolean;
}


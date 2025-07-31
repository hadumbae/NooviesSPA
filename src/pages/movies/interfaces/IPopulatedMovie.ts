import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";

export default interface IPopulatedMovie extends IMovie {
    genres: (ObjectId | Genre)[];
    showings: (ObjectId | IShowing)[];
}
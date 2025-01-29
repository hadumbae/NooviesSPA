import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";

export default interface IPopulatedShowing {
    _id: ObjectId;
    screen: IScreen;
    theatre: ITheatre;
    movie: IMovie;
}
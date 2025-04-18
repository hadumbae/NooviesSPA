import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import IShowingWithMovie from "@/pages/showings/interfaces/populated/IShowingWithMovie.ts";

export default interface ITheatreScreen extends IScreen {
    showings: IShowingWithMovie[],
}
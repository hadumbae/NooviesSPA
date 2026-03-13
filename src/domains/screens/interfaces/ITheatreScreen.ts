import {IScreen} from "@/domains/screens/interfaces/IScreen.ts";
import IShowingWithMovie from "@/domains/showings/interfaces/populated/IShowingWithMovie.ts";

export default interface ITheatreScreen extends IScreen {
    showings: IShowingWithMovie[],
}
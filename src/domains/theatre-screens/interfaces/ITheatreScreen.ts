import {IScreen} from "@/domains/theatre-screens/interfaces/IScreen.ts";
import IShowingWithMovie from "@/domains/showings/interfaces/populated/IShowingWithMovie.ts";

export default interface ITheatreScreen extends IScreen {
    showings: IShowingWithMovie[],
}
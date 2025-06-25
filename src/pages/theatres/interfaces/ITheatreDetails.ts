import ISeat from "@/pages/seats/interfaces/ISeat.ts";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";

export default interface ITheatreDetails extends ITheatre {
    seats: ISeat[];
    screens: IScreen[];
}
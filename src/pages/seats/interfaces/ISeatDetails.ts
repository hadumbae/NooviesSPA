import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import ISeatBase from "@/pages/seats/interfaces/ISeatBase.ts";

export default interface ISeatDetails extends ISeatBase {
    screen: IScreen;
    theatre: ITheatre;
}
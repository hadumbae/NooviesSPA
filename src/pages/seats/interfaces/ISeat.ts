import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import ISeatBase from "@/pages/seats/interfaces/ISeatBase.ts";

export default interface ISeat extends ISeatBase {
    screen: ObjectId | IScreen;
    theatre: ObjectId | ITheatre;
}
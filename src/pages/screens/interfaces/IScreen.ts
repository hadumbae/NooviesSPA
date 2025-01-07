import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import ISeat from "@/pages/seats/interfaces/ISeat.ts";
import {ScreenType} from "@/pages/screens/schema/ScreenTypeEnum.ts";

export interface IScreen {
    readonly _id: ObjectId,
    name: string,
    capacity: number,
    screenType: ScreenType,
    theatre: ObjectId | ITheatre,
    seats: (ObjectId | ISeat)[],
}
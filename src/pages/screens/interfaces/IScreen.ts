import {ScreenType} from "@/pages/screens/schema/ScreenTypeEnum.ts";

import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import ISeat from "@/pages/seats/interfaces/ISeat.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export interface IScreen {
    readonly _id: ObjectId,
    name: string,
    capacity: number,
    screenType: ScreenType,
    theatre: ObjectId | ITheatre,
    seats: (ObjectId | ISeat)[],
    showings: (ObjectId | IShowing)[],
}
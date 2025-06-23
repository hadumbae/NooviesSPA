import {ScreenType} from "@/pages/screens/schema/ScreenType.enum.ts";

import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import ISeat from "@/pages/seats/interfaces/ISeat.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export interface IScreenDetails {
    readonly _id: ObjectId,
    name: string,
    capacity: number,
    screenType: ScreenType,
    
    theatre: ITheatre,
    seats: ISeat[],
    showings: IShowing[],
}
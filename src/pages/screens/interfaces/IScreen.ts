import {ScreenType} from "@/pages/screens/schema/ScreenType.enum.ts";

import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export interface IScreen {
    readonly _id: ObjectId,
    name: string,
    capacity: number,
    screenType: ScreenType,
    theatre: ObjectId | ITheatre,
}
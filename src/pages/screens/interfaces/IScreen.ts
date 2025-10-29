import {ScreenType} from "@/pages/screens/schema/ScreenType.enum.ts";

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

export interface IScreen {
    readonly _id: ObjectId,
    name: string,
    capacity: number,
    screenType: ScreenType,
    theatre: ObjectId | Theatre,
}
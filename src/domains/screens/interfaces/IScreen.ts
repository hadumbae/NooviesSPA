import {ScreenType} from "@/domains/screens/schema/ScreenType.enum.ts";

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Theatre} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";

export interface IScreen {
    readonly _id: ObjectId,
    name: string,
    capacity: number,
    screenType: ScreenType,
    theatre: ObjectId | Theatre,
}
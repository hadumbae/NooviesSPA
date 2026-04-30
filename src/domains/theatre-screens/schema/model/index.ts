import {TheatreScreen, TheatreScreenSchema} from "./theatre-screen/TheatreScreenSchema.ts";
import {
    PopulatedTheatreScreen,
    PopulatedTheatreScreenSchema
} from "./theatre-screen/PopulatedTheatreScreenSchema.ts";
import {
    TheatreScreenDetails,
    TheatreScreenDetailsSchema
} from "./theatre-screen-details/TheatreScreenDetailsSchema.ts";
import {
    TheatreScreenArray,
    TheatreScreenArraySchema
} from "./theatre-screen/TheatreScreenArraySchema.ts";
import {
    PaginatedTheatreScreens,
    PaginatedTheatreScreenSchema
} from "./theatre-screen/PaginatedTheatreScreenSchema.ts";
import {
    PaginatedTheatreScreenDetails,
    PaginatedTheatreScreenDetailsSchema
} from "./theatre-screen-details/PaginatedTheatreScreenDetailsSchema.ts";
import {
    ScreenWithShowings,
    ScreenWithShowingsSchema
} from "./theatre-screen-with-showings/ScreenWithShowingsSchema.ts";
import {
    ScreenWithShowingsArray,
    ScreenWithShowingsArraySchema
} from "./theatre-screen-with-showings/ScreenWithShowingsArraySchema.ts";
import {ScreenType, ScreenTypeSchema} from "@/domains/theatre-screens/schema/model/ScreenTypeSchema.ts";
import {
    TheatreScreenWithVirtuals,
    TheatreScreenWithVirtualsSchema
} from "./theatre-screen-with-virtuals/TheatreScreenWithVirtualsSchema.ts";
import {
    TheatreScreenVirtuals,
    TheatreScreenVirtualsSchema
} from "./theatre-screen-with-virtuals/TheatreScreenVirtualsSchema.ts";


export {
    TheatreScreenSchema,
    PopulatedTheatreScreenSchema,
    TheatreScreenDetailsSchema,
    TheatreScreenArraySchema,
    PaginatedTheatreScreenSchema,
    PaginatedTheatreScreenDetailsSchema,
    ScreenWithShowingsSchema,
    ScreenWithShowingsArraySchema,
    ScreenTypeSchema,
    TheatreScreenWithVirtualsSchema,
    TheatreScreenVirtualsSchema,
}

export type {
    TheatreScreen,
    PopulatedTheatreScreen,
    TheatreScreenDetails,
    TheatreScreenArray,
    PaginatedTheatreScreens,
    PaginatedTheatreScreenDetails,
    ScreenWithShowings,
    ScreenWithShowingsArray,
    ScreenType,
    TheatreScreenWithVirtuals,
    TheatreScreenVirtuals,
}

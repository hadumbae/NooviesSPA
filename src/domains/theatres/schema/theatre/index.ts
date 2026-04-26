import {Theatre, TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";
import {TheatreDetails, TheatreDetailsSchema} from "@/domains/theatres/schema/theatre/TheatreDetailsSchema.ts";
import {TheatreArray, TheatreArraySchema} from "@/domains/theatres/schema/theatre/TheatreArraySchema.ts";
import {
    PaginatedTheatreDetails,
    PaginatedTheatreDetailsSchema
} from "@/domains/theatres/schema/theatre/PaginatedTheatreDetailsSchema.ts";
import {PaginatedTheatres, PaginatedTheatreSchema} from "@/domains/theatres/schema/theatre/PaginatedTheatreSchema.ts";
import {
    PaginatedTheatresWithRecentShowings,
    PaginatedTheatresWithRecentShowingsSchema
} from "@/domains/theatres/schema/theatre/PaginatedTheatresWithRecentShowingsSchema.ts";
import {
    TheatreWithRecentShowings,
    TheatreWithRecentShowingsSchema
} from "@/domains/theatres/schema/theatre/TheatreWithRecentShowingsSchema.ts";

export {
    TheatreSchema,
    TheatreDetailsSchema,
    TheatreArraySchema,
    PaginatedTheatreDetailsSchema,
    PaginatedTheatreSchema,
    PaginatedTheatresWithRecentShowingsSchema,
    TheatreWithRecentShowingsSchema,
}

export type {
    Theatre,
    TheatreArray,
    PaginatedTheatres,
    TheatreDetails,
    PaginatedTheatreDetails,
    PaginatedTheatresWithRecentShowings,
    TheatreWithRecentShowings,
}


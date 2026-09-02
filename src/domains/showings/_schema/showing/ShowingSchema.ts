/**
 * @fileoverview Core showing schema and type definition.
 */

import {z} from "zod";
import {IANATimezoneSchema, IDStringSchema, NonEmptyStringSchema} from "@/common/_schemas";
import {ISO6391LanguageCodeSchema} from "@/common/_schemas/enums/ISO6391LanguageCodeSchema.ts";
import {ShowingConfigSchema} from "@/domains/showings/_schema/showing/ShowingConfigSchema.ts";
import {ShowingStatusSchema, ShowingTimeSchema, TicketPriceSchema} from "@/domains/showings/_schema/fields";
import {TheatreSnapshotSchema} from "@/domains/theatres/_schema/snapshot/TheatreSnapshotSchema.ts";

/**
 * Core showing schema.
 */
export const ShowingSchema = z.object({
    _id: IDStringSchema.readonly(),
    startTime: ShowingTimeSchema,
    endTime: ShowingTimeSchema.optional().nullable(),
    timezone: IANATimezoneSchema,
    ticketPrice: TicketPriceSchema,
    language: ISO6391LanguageCodeSchema,
    subtitleLanguages: z.array(ISO6391LanguageCodeSchema).nonempty({message: "Must not be empty."}),
    movie: IDStringSchema,
    theatre: IDStringSchema,
    screen: IDStringSchema,
    status: ShowingStatusSchema,
    theatreSnapshot: TheatreSnapshotSchema,
    config: ShowingConfigSchema,
    slug: NonEmptyStringSchema,
});

/**
 * Inferred showing type.
 */
export type Showing = z.infer<typeof ShowingSchema>;
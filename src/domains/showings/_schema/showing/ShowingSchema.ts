/**
 * @fileoverview Core showing schema and type definition.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {ShowingConfigSchema} from "@/domains/showings/_schema/showing/ShowingConfigSchema.ts";
import {ShowingStatusSchema, ShowingTimeSchema, TicketPriceSchema} from "@/domains/showings/_schema/fields";

/**
 * Core showing schema.
 */
export const ShowingSchema = z.object({
    _id: IDStringSchema.readonly(),
    startTime: ShowingTimeSchema,
    endTime: ShowingTimeSchema.optional().nullable(),
    ticketPrice: TicketPriceSchema,
    language: ISO6391LanguageCodeEnum,
    subtitleLanguages: z.array(ISO6391LanguageCodeEnum).nonempty({message: "Must not be empty."}),
    movie: IDStringSchema,
    theatre: IDStringSchema,
    screen: IDStringSchema,
    status: ShowingStatusSchema,
    config: ShowingConfigSchema,
    slug: NonEmptyStringSchema,
});

/**
 * Inferred showing type.
 */
export type Showing = z.infer<typeof ShowingSchema>;
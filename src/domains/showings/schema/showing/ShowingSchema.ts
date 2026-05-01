/**
 * @fileoverview Core showing schema and type definition.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {ShowingStatusSchema} from "../fields/ShowingStatusSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

import {ShowingConfigSchema} from "@/domains/showings/schema/showing/ShowingConfigSchema.ts";
import {ShowingTimeSchema} from "@/domains/showings/schema/fields";
import {TicketPriceSchema} from "@/domains/showings/schema/fields/TicketPriceSchema.ts";

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
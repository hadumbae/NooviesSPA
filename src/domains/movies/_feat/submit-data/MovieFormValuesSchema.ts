/**
 * @fileoverview Defines the Zod schema for movie form data submission.
 *
 */

import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Zod schema for validating movie form values.
 * @deprecated This schema is slated to be removed.
 */
export const MovieFormValuesSchema = z.object({
    title: FormStarterValueSchema,
    originalTitle: FormStarterValueSchema,
    tagline: FormStarterValueSchema,
    country: FormStarterValueSchema,
    synopsis: FormStarterValueSchema,
    releaseDate: FormStarterValueSchema,
    isReleased: FormStarterValueSchema,
    runtime: FormStarterValueSchema,
    originalLanguage: FormStarterValueSchema,
    trailerURL: FormStarterValueSchema.optional().nullable(),
    languages: z.array(ISO6391LanguageCodeEnum),
    subtitles: z.array(ISO6391LanguageCodeEnum),
    genres: z.array(IDStringSchema),
    isAvailable: FormStarterValueSchema,
})
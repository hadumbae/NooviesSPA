import {z, ZodType} from 'zod';
import {CountryEnum} from "@/common/schema/helpers/ZodEnumHelpers.ts";
import {CloudinaryImageObjectSchema} from "@/common/schema/objects/CloudinaryImageObjectSchema.ts";
import {CoercedDateSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import IPersonBase from "@/pages/persons/interfaces/IPersonBase.ts";

/**
 * Zod schema defining the raw validation rules for a base person object.
 *
 * This schema is used to validate data structures representing a person entity,
 * ensuring that fields such as name, biography, date of birth, and nationality conform
 * to expected formats and constraints.
 */
export const PersonBaseRawSchema = z.object({
    /**
     * The unique identifier of the person, validated as a string-based ObjectId.
     */
    _id: IDStringSchema.readonly(),

    /**
     * The person's full name, required to be between 3 and 255 characters.
     */
    name: NonEmptyStringSchema
        .min(3, "Must be at least 3 characters.")
        .max(255, "Name must not be more than 255 characters."),

    /**
     * A biography or description of the person, limited to 1000 characters.
     */
    biography: NonEmptyStringSchema
        .min(1, "Required.")
        .max(1000, "Must be 1000 characters or less."),

    /**
     * The person's date of birth. Accepts and coerces various date formats.
     */
    dob: CoercedDateSchema,

    /**
     * The person's nationality, validated against a predefined set of country values.
     */
    nationality: CountryEnum,

    /**
     * An optional Cloudinary-hosted profile image object.
     */
    profileImage: CloudinaryImageObjectSchema
        .nullable()
        .optional(),
});

/**
 * Typed Zod schema for validating objects that conform to the {@link IPersonBase} interface.
 *
 * This schema enforces the same structure as `PersonBaseRawSchema` but explicitly maps
 * to the `IPersonBase` TypeScript interface for stronger type inference.
 */
export const PersonBaseSchema = PersonBaseRawSchema as ZodType<IPersonBase>;
import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {PersonSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {RoleTypeSchema} from "@/pages/roletype/schema/model/RoleType.schema.ts";
import {UndefinedForCrewSchema} from "@/pages/moviecredit/schemas/MovieCreditCrewSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

/**
 * Base schema for a movie credit, either cast or crew.
 *
 * @remarks
 * - Contains properties common to both cast and crew credits.
 * - Serves as a foundation for discriminated unions.
 */
export const MovieCreditBaseSchema = z.object({
    /** Unique identifier of the movie credit */
    _id: IDStringSchema.readonly(),

    /** URL-friendly slug derived from the credited person. */
    slug: NonEmptyStringSchema.max(75, "Must be 75 characters or less."),

    /** Department of the credit (CAST or CREW) */
    department: RoleTypeDepartmentEnumSchema,

    /** Display name of the role, optional; max 150 characters */
    displayRoleName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ),

    /** Name used in credits, optional; max 150 characters */
    creditedAs: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ),

    /** Whether the credit is uncredited; optional boolean */
    uncredited: CoercedBooleanValueSchema.optional(),

    /** Notes about the credit; optional nullable string */
    notes: NonEmptyStringSchema.nullable().optional(),

    /** ID of the associated movie */
    movie: IDStringSchema,

    /** ID of the associated person */
    person: IDStringSchema,

    /** ID of the role type */
    roleType: IDStringSchema,
});

/**
 * Schema representing crew credits.
 *
 * @remarks
 * - Extends {@link MovieCreditBaseSchema}.
 * - All cast-specific fields are set to undefined for crew.
 */
export const MovieCreditCrewSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CREW"),

    /** Cast-specific properties are undefined for crew */
    billingOrder: UndefinedForCrewSchema,
    characterName: UndefinedForCrewSchema,
    isPrimary: UndefinedForCrewSchema,
    voiceOnly: UndefinedForCrewSchema,
    cameo: UndefinedForCrewSchema,
    motionCapture: UndefinedForCrewSchema,
    archiveFootage: UndefinedForCrewSchema,
});

/**
 * Schema representing cast credits.
 *
 * @remarks
 * - Extends {@link MovieCreditBaseSchema}.
 * - Includes cast-specific fields like characterName, billingOrder, etc.
 */
export const MovieCreditCastSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CAST"),

    /** Character name for the role */
    characterName: NonEmptyStringSchema,

    /** Billing order of the cast member; optional */
    billingOrder: PositiveNumberSchema.optional(),

    /** Whether the role is primary */
    isPrimary: CoercedBooleanValueSchema,

    /** Flags indicating specific role properties */
    voiceOnly: CoercedBooleanValueSchema,
    cameo: CoercedBooleanValueSchema,
    motionCapture: CoercedBooleanValueSchema,
    archiveFootage: CoercedBooleanValueSchema,
});

/**
 * Discriminated union of cast and crew movie credits.
 *
 * @remarks
 * - Allows validation of a credit as either cast or crew based on the `department` field.
 */
export const MovieCreditSchema = z.discriminatedUnion("department", [
    MovieCreditCrewSchema,
    MovieCreditCastSchema,
]);

/**
 * Extension of movie credit schemas with detailed object references.
 *
 * @remarks
 * - Replaces IDs with full objects for `movie`, `person`, and `roleType`.
 * - Useful for returning fully populated details in API responses.
 */
const detailsExtension = {
    movie: z.lazy(() => MovieSchema),
    person: z.lazy(() => PersonSchema),
    roleType: z.lazy(() => RoleTypeSchema),
};

const detailsOptions = [
    MovieCreditCrewSchema.extend(detailsExtension),
    MovieCreditCastSchema.extend(detailsExtension),
] as const;

/**
 * Schema for movie credit details including populated `movie`, `person`, and `roleType`.
 */
export const MovieCreditDetailsSchema = z.discriminatedUnion("department", detailsOptions);

/**
 * Extension for movie credit details excluding person details.
 *
 * @remarks
 * - `person` remains as an ID while `movie` and `roleType` are populated.
 */
const detailsExceptPersonExtension = {
    person: IDStringSchema,
    movie: z.lazy(() => MovieSchema),
    roleType: z.lazy(() => RoleTypeSchema),
};

const detailsExceptPersonOptions = [
    MovieCreditCrewSchema.extend(detailsExceptPersonExtension),
    MovieCreditCastSchema.extend(detailsExceptPersonExtension),
] as const;

/**
 * Schema for movie credit details excluding the person object.
 *
 * @remarks
 * - Useful when you want full movie and roleType details but only a reference ID for the person.
 */
export const MovieCreditDetailsExceptPersonSchema = z.discriminatedUnion(
    "department",
    detailsExceptPersonOptions
);

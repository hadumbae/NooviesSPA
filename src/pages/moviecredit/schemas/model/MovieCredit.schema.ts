import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/NonEmptyStringSchema.ts";
import { RequiredBoolean } from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import { RoleTypeDepartmentEnumSchema } from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import { IDStringSchema } from "@/common/schema/strings/IDStringSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { MovieSchema } from "@/pages/movies/schema/movie/Movie.schema.ts";
import { PersonSchema } from "@/pages/persons/schema/person/Person.schema.ts";
import { RoleTypeSchema } from "@/pages/roletype/schema/model/RoleType.schema.ts";
import { generatePaginationSchema } from "@/common/schema/helpers/zodHelperFunctions.ts";
import generateArraySchema from "@/common/utility/validation/generateArraySchema.ts";
import { UndefinedForCrewSchema } from "@/pages/moviecredit/schemas/MovieCreditCrewSchema.ts";

/**
 * Base schema for a movie credit (either cast or crew).
 *
 * @remarks
 * - Defines shared properties between cast and crew.
 * - Used as a foundation for discriminated unions.
 */
export const MovieCreditBaseSchema = z.object({
    /** Unique identifier of the movie credit */
    _id: IDStringSchema.readonly(),
    /** Department of the credit, e.g., CAST or CREW */
    department: RoleTypeDepartmentEnumSchema,
    /** Display name of the role, optional; trimmed and max 150 characters */
    displayRoleName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ),
    /** Name used in credits, optional; trimmed and max 150 characters */
    creditedAs: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ),
    /** Whether the credit is uncredited; optional boolean */
    uncredited: RequiredBoolean.optional(),
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
 * Schema for crew credits.
 *
 * @remarks
 * - Extends the base credit schema.
 * - All cast-specific fields are set to undefined for crew.
 */
const CrewSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CREW"),
    billingOrder: UndefinedForCrewSchema,
    characterName: UndefinedForCrewSchema,
    isPrimary: UndefinedForCrewSchema,
    voiceOnly: UndefinedForCrewSchema,
    cameo: UndefinedForCrewSchema,
    motionCapture: UndefinedForCrewSchema,
    archiveFootage: UndefinedForCrewSchema,
});

/**
 * Schema for cast credits.
 *
 * @remarks
 * - Extends the base credit schema.
 * - Includes cast-specific fields like characterName, billingOrder, etc.
 */
const CastSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CAST"),
    characterName: NonEmptyStringSchema,
    billingOrder: PositiveNumberSchema.optional(),
    isPrimary: RequiredBoolean,
    voiceOnly: RequiredBoolean,
    cameo: RequiredBoolean,
    motionCapture: RequiredBoolean,
    archiveFootage: RequiredBoolean,
});

/**
 * Discriminated union of cast and crew credits.
 *
 * @remarks
 * - Uses `department` as the discriminator.
 */
export const MovieCreditSchema = z.discriminatedUnion("department", [CrewSchema, CastSchema]);

/** Paginated list of movie credits */
export const PaginatedMovieCreditSchema = generatePaginationSchema(MovieCreditSchema);

/** Array of movie credits */
export const MovieCreditArraySchema = generateArraySchema(MovieCreditSchema);

/** Lazy-loaded references for detailed schemas */
const detailsExtension = {
    /** Full movie object for detailed view */
    movie: z.lazy(() => MovieSchema),
    /** Full person object for detailed view */
    person: z.lazy(() => PersonSchema),
    /** Full role type object for detailed view */
    roleType: z.lazy(() => RoleTypeSchema),
};

/** Crew and cast detailed schemas with full references */
const sharedDetailsSchemas = [
    CrewSchema.extend(detailsExtension),
    CastSchema.extend(detailsExtension),
] as const;

/**
 * Discriminated union of detailed cast and crew credits.
 *
 * @remarks
 * - Includes full nested objects for movie, person, and role type.
 */
export const MovieCreditDetailsSchema = z.discriminatedUnion("department", sharedDetailsSchemas);

/** Paginated detailed movie credits */
export const PaginatedMovieCreditDetailsSchema = generatePaginationSchema(MovieCreditDetailsSchema);

/** Array of detailed movie credits */
export const MovieCreditDetailsArraySchema = generateArraySchema(MovieCreditDetailsSchema);

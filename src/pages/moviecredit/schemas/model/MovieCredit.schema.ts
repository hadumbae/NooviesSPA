import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {PersonSchema} from "@/pages/persons/schema/person/Person.schema.ts";
import {RoleTypeSchema} from "@/pages/roletype/schema/model/RoleType.schema.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import generateArraySchema from "@/common/utility/validation/generateArraySchema.ts";

/**
 * Zod schema representing a boolean that **must always be `false`**.
 */
const FalseForCrewSchema = z.literal(false, {
    message: "Must be `false` for `CREW` credits.",
});

/**
 * Zod schema representing a value that **must be undefined**.
 */
const UndefinedForCrewSchema = z.undefined({
    invalid_type_error: "Must be `undefined`.",
    message: "Must be `undefined` for `CREW` credits.",
});

/**
 * Base schema for a movie credit.
 */
export const MovieCreditBaseSchema = z.object({
    _id: IDStringSchema.readonly(),
    department: RoleTypeDepartmentEnumSchema,
    displayRoleName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ),
    creditedAs: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ),
    uncredited: RequiredBoolean.optional(),
    notes: NonEmptyStringSchema.nullable().optional(),
});

/**
 * Shared fields for CREW credits.
 */
const CrewSharedFields = {
    department: z.literal("CREW"),
    billingOrder: UndefinedForCrewSchema,
    characterName: UndefinedForCrewSchema,
    isPrimary: FalseForCrewSchema,
    voiceOnly: FalseForCrewSchema,
    cameo: FalseForCrewSchema,
    motionCapture: FalseForCrewSchema,
    archiveFootage: FalseForCrewSchema,
};

/**
 * Shared fields for CAST credits.
 */
const CastSharedFields = {
    department: z.literal("CAST"),
    characterName: NonEmptyStringSchema,
    billingOrder: PositiveNumberSchema,
    isPrimary: RequiredBoolean,
    voiceOnly: RequiredBoolean,
    cameo: RequiredBoolean,
    motionCapture: RequiredBoolean,
    archiveFootage: RequiredBoolean,
};

/**
 * Extended schema with IDs for movie, person, and role type.
 */
const MovieCreditExtendedSchema = MovieCreditBaseSchema.extend({
    movie: IDStringSchema,
    person: IDStringSchema,
    roleType: IDStringSchema,
});

/** Schema for CREW credits. */
const CrewSchema = MovieCreditExtendedSchema.extend(CrewSharedFields);

/** Schema for CAST credits. */
const CastSchema = MovieCreditExtendedSchema.extend(CastSharedFields);

/**
 * Extended schema with full objects for movie, person, and role type.
 */
const MovieCreditDetailsExtendedSchema = MovieCreditBaseSchema.extend({
    movie: MovieSchema,
    person: PersonSchema,
    roleType: RoleTypeSchema,
});

/** Schema for CREW credits with full objects. */
const CrewDetailsSchema = MovieCreditDetailsExtendedSchema.extend(CrewSharedFields);

/** Schema for CAST credits with full objects. */
const CastDetailsSchema = MovieCreditDetailsExtendedSchema.extend(CastSharedFields);

/**
 * Discriminated union schema for movie credits.
 *
 * Includes both CREW and CAST credits.
 * - `department` determines the type (`CREW` or `CAST`).
 * - CREW fields are constrained with `FalseForCrewSchema` / `UndefinedForCrewSchema`.
 * - CAST fields have required fields such as `characterName`, `billingOrder`, etc.
 */
export const MovieCreditSchema = z.discriminatedUnion("department", [CrewSchema, CastSchema]);

/**
 * Discriminated union schema for detailed movie credits.
 *
 * Similar to `MovieCreditSchema`, but references full objects instead of IDs:
 * - `movie` is a `MovieSchema` object.
 * - `person` is a `PersonSchema` object.
 * - `roleType` is a `RoleTypeSchema` object.
 * Useful for endpoints returning expanded data rather than just IDs.
 */
export const MovieCreditDetailsSchema = z.discriminatedUnion("department", [CrewDetailsSchema, CastDetailsSchema]);

/**
 * Paginated schema for movie credits.
 *
 * Wraps `MovieCreditSchema` with pagination metadata.
 * Useful for list endpoints with `page`, `limit`, `total`, and `results`.
 */
export const PaginatedMovieCreditSchema = generatePaginationSchema(MovieCreditSchema);

/**
 * Paginated schema for detailed movie credits.
 *
 * Wraps `MovieCreditDetailsSchema` with pagination metadata.
 * Useful for list endpoints returning full objects (`movie`, `person`, `roleType`) in `results`.
 */
export const PaginatedMovieCreditDetailsSchema = generatePaginationSchema(MovieCreditDetailsSchema);

/**
 * Schema for an array of movie credits.
 *
 * Each item follows the `MovieCreditSchema` structure (discriminated union of CREW and CAST).
 * Useful for endpoints that return multiple credits without pagination.
 */
export const MovieCreditArraySchema = generateArraySchema(MovieCreditSchema);

/**
 * Schema for an array of detailed movie credits.
 *
 * Each item follows the `MovieCreditDetailsSchema` structure (discriminated union of CREW and CAST with full objects).
 * Useful for endpoints that return multiple detailed credits without pagination.
 */
export const MovieCreditDetailsArraySchema = generateArraySchema(MovieCreditDetailsSchema);
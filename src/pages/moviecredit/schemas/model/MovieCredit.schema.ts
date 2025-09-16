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
import {UndefinedForCrewSchema} from "@/pages/moviecredit/schemas/MovieCreditCrewSchema.ts";

/**
 * Base schema for a **movie credit record**.
 *
 * Contains fields shared by both CAST and CREW credits.
 * - Used as the foundation for extended schemas with either ID references or nested objects.
 */
export const MovieCreditBaseSchema = z.object({
    /** Unique identifier of the movie credit. */
    _id: IDStringSchema.readonly(),
    /** Department of the credit (`CAST` or `CREW`). */
    department: RoleTypeDepartmentEnumSchema,
    /** Displayed role name (optional, max 150 chars). */
    displayRoleName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ),
    /** Alternative credited name (optional, max 150 chars). */
    creditedAs: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ),
    /** Whether the credit is marked as "uncredited". */
    uncredited: RequiredBoolean.optional(),
    /** Free-form notes for the credit (optional, nullable). */
    notes: NonEmptyStringSchema.nullable().optional(),
});

/**
 * Shared fields for **CREW credits**.
 *
 * - Department must be `"CREW"`.
 * - CAST-only fields are explicitly forbidden (`UndefinedForCrewSchema`).
 */
const CrewSharedFields = {
    department: z.literal("CREW"),
    billingOrder: UndefinedForCrewSchema,
    characterName: UndefinedForCrewSchema,
    isPrimary: UndefinedForCrewSchema,
    voiceOnly: UndefinedForCrewSchema,
    cameo: UndefinedForCrewSchema,
    motionCapture: UndefinedForCrewSchema,
    archiveFootage: UndefinedForCrewSchema,
};

/**
 * Shared fields for **CAST credits**.
 *
 * - Department must be `"CAST"`.
 * - Requires character-specific and billing fields.
 */
const CastSharedFields = {
    department: z.literal("CAST"),
    /** Character name as displayed in the credits. */
    characterName: NonEmptyStringSchema,
    /** Billing order (positive integer). Optional. */
    billingOrder: PositiveNumberSchema.optional(),
    /** Whether this is the actor's *primary* role. */
    isPrimary: RequiredBoolean,
    /** Whether the actor is uncredited. */
    voiceOnly: RequiredBoolean,
    /** Whether the appearance is a cameo. */
    cameo: RequiredBoolean,
    /** Whether the role involves motion capture. */
    motionCapture: RequiredBoolean,
    /** Whether the role is based on archive footage. */
    archiveFootage: RequiredBoolean,
};

/**
 * Extended schema for a **movie credit with ID references**.
 *
 * Adds references to `movie`, `person`, and `roleType` by ID.
 */
const MovieCreditExtendedSchema = MovieCreditBaseSchema.extend({
    /** Movie ID reference. */
    movie: IDStringSchema,
    /** Person ID reference. */
    person: IDStringSchema,
    /** Role type ID reference. */
    roleType: IDStringSchema,
});

/** Schema for a **CREW credit with ID references**. */
const CrewSchema = MovieCreditExtendedSchema.extend(CrewSharedFields);

/** Schema for a **CAST credit with ID references**. */
const CastSchema = MovieCreditExtendedSchema.extend(CastSharedFields);

/**
 * Extended schema for a **movie credit with nested objects**.
 *
 * Expands `movie`, `person`, and `roleType` into their full schema definitions.
 * Useful for endpoints returning populated/expanded objects.
 */
const MovieCreditDetailsExtendedSchema = MovieCreditBaseSchema.extend({
    /** Expanded movie object. */
    movie: z.lazy(() => MovieSchema),
    /** Expanded person object. */
    person: z.lazy(() => PersonSchema),
    /** Expanded role type object. */
    roleType: z.lazy(() => RoleTypeSchema),
});

/** Schema for a **CREW credit with expanded objects**. */
const CrewDetailsSchema = MovieCreditDetailsExtendedSchema.extend(CrewSharedFields);

/** Schema for a **CAST credit with expanded objects**. */
const CastDetailsSchema = MovieCreditDetailsExtendedSchema.extend(CastSharedFields);

/**
 * Discriminated union schema for movie credits with ID references.
 *
 * - Union of {@link CrewSchema} and {@link CastSchema}.
 * - Discriminated by `department`.
 * - Suitable for storage and most API responses where references are sufficient.
 */
export const MovieCreditSchema = z.discriminatedUnion("department", [CrewSchema, CastSchema]);

/**
 * Discriminated union schema for detailed movie credits with expanded objects.
 *
 * - Union of {@link CrewDetailsSchema} and {@link CastDetailsSchema}.
 * - Discriminated by `department`.
 * - Used in endpoints that return full objects for `movie`, `person`, and `roleType`.
 */
export const MovieCreditDetailsSchema = z.discriminatedUnion("department", [CrewDetailsSchema, CastDetailsSchema]);

/**
 * Paginated schema for movie credits with ID references.
 *
 * Wraps {@link MovieCreditSchema} in pagination metadata:
 * - `page`, `limit`, `total`
 * - `results` (array of credits).
 */
export const PaginatedMovieCreditSchema = generatePaginationSchema(MovieCreditSchema);

/**
 * Paginated schema for detailed movie credits with expanded objects.
 *
 * Wraps {@link MovieCreditDetailsSchema} in pagination metadata:
 * - `page`, `limit`, `total`
 * - `results` (array of expanded credits).
 */
export const PaginatedMovieCreditDetailsSchema = generatePaginationSchema(MovieCreditDetailsSchema);

/**
 * Schema for a raw array of movie credits with ID references.
 *
 * Each entry follows {@link MovieCreditSchema}.
 */
export const MovieCreditArraySchema = generateArraySchema(MovieCreditSchema);

/**
 * Schema for a raw array of detailed movie credits with expanded objects.
 *
 * Each entry follows {@link MovieCreditDetailsSchema}.
 */
export const MovieCreditDetailsArraySchema = generateArraySchema(MovieCreditDetailsSchema);

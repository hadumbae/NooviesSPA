import {z, type ZodType} from 'zod';
import IPerson from "@/pages/persons/interfaces/IPerson.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {PersonBaseRawSchema} from "@/pages/persons/schema/PersonBaseSchema.ts";

/**
 * Zod schema defining validation rules for a person object,
 * extending the base person schema with a `movies` field.
 *
 * The `movies` array can contain either:
 * - String IDs (ObjectId format)
 * - Or fully populated movie objects (represented as `any` here for flexibility)
 */
export const PersonRawSchema = PersonBaseRawSchema.extend({
    /**
     * An array of movie references associated with the person.
     * Each item can be either a string ID or a populated movie object.
     */
    movies: z.array(z.union([IDStringSchema, z.any()])),
});

/**
 * Typed Zod schema that satisfies the {@link IPerson} interface.
 *
 * This schema ensures validation aligns with the expected shape
 * of a complete person entity including related movies.
 */
export const PersonSchema = PersonRawSchema satisfies ZodType<IPerson>;

/**
 * The inferred TypeScript type from {@link PersonSchema}.
 *
 * This type represents a person entity including an array of movie references or objects.
 */
export type Person = z.infer<typeof PersonSchema>;

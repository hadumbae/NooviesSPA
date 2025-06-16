import {z, type ZodType} from 'zod';
import {PersonBaseRawSchema} from "@/pages/persons/schema/PersonBaseSchema.ts";
import IPopulatedPerson from "@/pages/persons/interfaces/IPopulatedPerson.ts";
import {MovieCreditSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";

/**
 * Zod schema defining a fully populated person object,
 * extending the base person schema with populated movie documents.
 *
 * This version of the schema is intended for responses where
 * movies are embedded as full objects rather than just IDs.
 */
export const PersonPopulatedRawSchema = PersonBaseRawSchema.extend({
    /**
     * An array of fully populated movie objects associated with the person.
     */
    movies: z.array(z.lazy(() => MovieCreditSchema), {message: "Must be an array."}),
});

/**
 * Typed Zod schema that satisfies the {@link IPopulatedPerson} interface.
 *
 * Ensures the validated object matches the structure of a person with populated movies.
 */
export const PersonPopulatedSchema = PersonPopulatedRawSchema as ZodType<IPopulatedPerson>;

/**
 * The inferred TypeScript type from {@link PersonPopulatedSchema}.
 *
 * Represents a person with embedded movie documents.
 */
export type PopulatedPerson = z.infer<typeof PersonPopulatedSchema>;

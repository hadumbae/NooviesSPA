import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {IMovieCreditBase} from "@/pages/moviecredit/interfaces/IMovieCreditBase.ts";

/**
 * Interface representing a reference-only version of a movie credit.
 *
 * @remarks
 * This interface extends {@link IMovieCreditBase} and replaces the `movie` and `person`
 * properties with their `ObjectId` references instead of populated object structures.
 * It is commonly used in contexts where only identifiers are needed—such as for
 * serialization, storage, or when joining data manually at a later stage.
 *
 * @example
 * ```ts
 * const credit: IReferenceMovieCredit = {
 *   _id: "creditId123",
 *   roleType: "CREW",
 *   job: "Director",
 *   movie: "movieId456",
 *   person: "personId789"
 * };
 * ```
 */
export interface IReferenceMovieCredit extends IMovieCreditBase {
    /** ObjectId reference to the associated movie. */
    movie: ObjectId;

    /** ObjectId reference to the associated person (cast or crew member). */
    person: ObjectId;
}
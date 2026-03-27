/**
 * @file Zod schema defining an immutable snapshot of a reserved showing.
 * @filename ReservedShowingSnapshot.schema.ts
 */

import {z} from "zod";
import {MovieSnapshotSchema} from "@/domains/movies/schema/snapshot/MovieSnapshotSchema.ts";
import {TheatreSnapshotSchema} from "@/domains/theatres/schema/model/snapshot/TheatreSnapshotSchema.ts";
import {ScreenSnapshotSchema} from "@/domains/theatre-screens/schema/snapshot/ScreenSnapshotSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {ReservedSeatSnapshotSchema} from "@/domains/reservation/schema/snapshot/ReservedSeatSnapshotSchema.ts";
import {UTCISO8601DateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Captures the complete state of a showing at the moment a reservation is finalized.
 */
export const ReservedShowingSnapshotSchema = z.object({
    /** Point-in-time details of the film being screened. */
    movie: MovieSnapshotSchema,

    /** Point-in-time details of the venue. */
    theatre: TheatreSnapshotSchema,

    /** Point-in-time details of the specific auditorium/screen. */
    screen: ScreenSnapshotSchema,

    /** List of specific seats allocated to this reservation. */
    selectedSeats: generateArraySchema(ReservedSeatSnapshotSchema),

    /** The exact scheduled start time (UTC). */
    startTime: UTCISO8601DateTimeSchema,

    /** The estimated conclusion time (UTC). */
    endTime: UTCISO8601DateTimeSchema.nullable().optional(),

    /** The audio language of the showing. */
    language: NonEmptyStringSchema,

    /** Available on-screen text languages; must contain at least one entry. */
    subtitleLanguages: z
        .array(NonEmptyStringSchema)
        .nonempty({message: "Must not be empty."}),

    /** Flag for promotional or restricted engagement screenings. */
    isSpecialEvent: BooleanValueSchema.optional(),

    /** The final calculated cost for the selected seats at the time of booking. */
    pricePaid: PositiveNumberSchema,
});

/**
 * TypeScript type inferred from {@link ReservedShowingSnapshotSchema}.
 */
export type ReservedShowingSnapshot = z.infer<typeof ReservedShowingSnapshotSchema>;
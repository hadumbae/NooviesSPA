/**
 * @file ReservedShowingSnapshot.schema.ts
 *
 * @description
 * Zod schema defining an immutable snapshot of a reserved showing.
 *
 * Captures the complete state of a showing at the moment a reservation is
 * finalized, including movie, venue, screen, timing, language details, and
 * seat-level pricing. This snapshot ensures historical accuracy even if the
 * underlying movie, theatre, screen, or pricing data changes in the future.
 *
 * Intended usage:
 * - Persisting finalized reservation data
 * - Rendering historical booking details
 * - Auditing pricing and seat allocations
 */

import { z } from "zod";
import { MovieSnapshotSchema } from "@/pages/movies/schema/snapshot/MovieSnapshotSchema.ts";
import { TheatreSnapshotSchema } from "@/pages/theatres/schema/model/snapshot/TheatreSnapshotSchema.ts";
import { ScreenSnapshotSchema } from "@/pages/screens/schema/snapshot/ScreenSnapshotSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { ReservedSeatSnapshotSchema } from "@/pages/reservation/schema/snapshot/ReservedSeatSnapshotSchema.ts";
import { UTCISO8601DateTimeSchema } from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { BooleanValueSchema } from "@/common/schema/boolean/BooleanValueSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Reserved showing snapshot schema.
 */
export const ReservedShowingSnapshotSchema = z.object({
    /** Snapshot of the movie being shown. */
    movie: MovieSnapshotSchema,

    /** Snapshot of the theatre hosting the showing. */
    theatre: TheatreSnapshotSchema,

    /** Snapshot of the screen where the showing takes place. */
    screen: ScreenSnapshotSchema,

    /** Seats selected and reserved for this showing. */
    selectedSeats: generateArraySchema(ReservedSeatSnapshotSchema),

    /** Scheduled start time of the showing (UTC, ISO 8601). */
    startTime: UTCISO8601DateTimeSchema,

    /** Optional scheduled end time of the showing (UTC, ISO 8601). */
    endTime: UTCISO8601DateTimeSchema.optional(),

    /** Primary spoken language of the showing. */
    language: NonEmptyStringSchema,

    /** Subtitle languages available for the showing. */
    subtitleLanguages: z
        .array(NonEmptyStringSchema)
        .nonempty({ message: "Must not be empty." }),

    /** Indicates whether this showing is a special event. */
    isSpecialEvent: BooleanValueSchema.optional(),

    /** Total price paid for the reservation. */
    pricePaid: PositiveNumberSchema,
});

/**
 * TypeScript type inferred from {@link ReservedShowingSnapshotSchema}.
 */
export type ReservedShowingSnapshot = z.infer<typeof ReservedShowingSnapshotSchema>;

/**
 * @file Zod schema defining an immutable snapshot of a reserved showing.
 * @filename ReservedShowingSnapshot.schema.ts
 */

import {z} from "zod";
import {MovieSnapshotSchema} from "@/domains/movies/schema/snapshot/MovieSnapshotSchema.ts";
import {TheatreSnapshotSchema} from "@/domains/theatres/schema/snapshot/TheatreSnapshotSchema.ts";
import {TheatreScreenSnapshotSchema} from "@/domains/theatre-screens/_schema/snapshot/TheatreScreenSnapshotSchema.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {ReservedSeatSnapshotSchema} from "@/domains/reservation/schema/snapshot/ReservedSeatSnapshotSchema.ts";
import {UTCISO8601DateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Captures the complete state of a showing at the moment a reservation is finalized.
 */
export const ReservedShowingSnapshotSchema = z.object({
    movie: MovieSnapshotSchema,
    theatre: TheatreSnapshotSchema,
    screen: TheatreScreenSnapshotSchema,
    selectedSeats: generateArraySchema(ReservedSeatSnapshotSchema).nullable(),
    startTime: UTCISO8601DateTimeSchema,
    endTime: UTCISO8601DateTimeSchema.nullable().optional(),
    language: NonEmptyStringSchema,
    subtitleLanguages: z
        .array(NonEmptyStringSchema)
        .nonempty({message: "Must not be empty."}),
    isSpecialEvent: BooleanValueSchema.optional(),
    pricePaid: PositiveNumberSchema,
});

/**
 * TypeScript type inferred from {@link ReservedShowingSnapshotSchema}.
 */
export type ReservedShowingSnapshot = z.infer<typeof ReservedShowingSnapshotSchema>;
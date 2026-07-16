/**
 * @fileoverview Zod schema defining an immutable snapshot of a reserved showing.
 */

import {z} from "zod";
import {MovieSnapshotSchema} from "@/domains/movies/_schema/snapshot/MovieSnapshotSchema.ts";
import {TheatreSnapshotSchema} from "@/domains/theatres/_schema/snapshot/TheatreSnapshotSchema.ts";
import {TheatreScreenSnapshotSchema} from "@/domains/theatre-screens/_schema/snapshot/TheatreScreenSnapshotSchema.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {ReservedSeatSnapshotSchema} from "@/domains/reservations/_schema/snapshot/ReservedSeatSnapshotSchema.ts";
import {ISO8601DateTimeSchema} from "@/common/_schemas/iso-8601/ISO8601DateTimeSchema.ts";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {BooleanValueSchema} from "@/common/_schemas/boolean/BooleanValueSchema.ts";

import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/** Zod schema for capturing the complete state of a showing at the moment a reservation is finalized. */
export const ReservedShowingSnapshotSchema = z.object({
    movie: MovieSnapshotSchema,
    theatre: TheatreSnapshotSchema,
    screen: TheatreScreenSnapshotSchema,
    selectedSeats: generateArraySchema(ReservedSeatSnapshotSchema).nullable(),
    startTime: ISO8601DateTimeSchema,
    endTime: ISO8601DateTimeSchema.nullable().optional(),
    language: NonEmptyStringSchema,
    subtitleLanguages: z.array(NonEmptyStringSchema).nonempty({message: "Must not be empty."}),
    isSpecialEvent: BooleanValueSchema.optional(),
    pricePaid: PositiveNumberSchema,
});

/** TypeScript type inferred from ReservedShowingSnapshotSchema. */
export type ReservedShowingSnapshot = z.infer<typeof ReservedShowingSnapshotSchema>;
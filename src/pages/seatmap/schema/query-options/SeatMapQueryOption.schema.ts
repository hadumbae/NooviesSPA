/**
 * # Seat Map Query Schemas
 *
 * This module provides Zod schemas for filtering and sorting seat map data.
 * These schemas are used when constructing API query parameters, repository
 * query objects, or validating UI-driven filter/sort inputs.
 *
 * ## Included Schemas
 * - **SeatMapFilterSchema** — Validation for filterable fields.
 * - **SeatMapSortSchema** — Validation for sortable fields.
 * - **SeatMapQueryOptionSchema** — Combined schema merging filter + sort.
 *
 * ## Purpose
 * These schemas ensure:
 * - Strong typing and validation of query parameters.
 * - Consistent interpretation of optional fields.
 * - Safe and predictable construction of MongoDB/Mongoose queries.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {SeatMapStatusEnum} from "@/pages/seatmap/schema/enum/SeatMapStatusEnum.ts";
import {ShowingStatusEnumSchema} from "@/pages/showings/schema/ShowingStatus.enum.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatType.enum.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * ## SeatMapFilterSchema
 *
 * Defines validation for filterable seat-map-related fields.
 * Each field is optional, allowing partial filtering.
 *
 * ### Fields
 * - **movie** — Optional Movie ObjectId.
 * - **showing** — Optional Showing ObjectId.
 * - **seat** — Optional Seat ObjectId.
 * - **price** — Optional numeric filter.
 * - **status** — Optional `SeatMapStatusEnum` value.
 * - **showingStatus** — Optional status from `ShowingStatusEnumSchema`.
 * - **seatRow** — Optional non-empty string, max 10 chars.
 * - **seatNumber** — Optional positive number.
 * - **seatType** — Optional `SeatTypeEnum` value.
 *
 * @example
 * SeatMapFilterSchema.parse({
 *   movie: "6530a8121e4f09c92f123abc",
 *   seatRow: "B",
 *   status: "AVAILABLE"
 * });
 */
export const SeatMapFilterSchema = z.object({
    movie: IDStringSchema.optional(),
    showing: IDStringSchema.optional(),
    seat: IDStringSchema.optional(),
    price: PositiveNumberSchema.optional(),
    status: SeatMapStatusEnum.optional(),
    showingStatus: ShowingStatusEnumSchema.optional(),
    seatRow: NonEmptyStringSchema.max(10, "Must be 10 characters or less.").optional(),
    seatNumber: PositiveNumberSchema.optional(),
    seatType: SeatTypeEnum.optional(),
});

/**
 * ## SeatMapSortSchema
 *
 * Defines sorting options for seat map queries.
 * Each field corresponds to a database sort order using
 * `MongooseSortOrderSchema` (typically `1` for ascending or `-1` for descending).
 *
 * ### Fields
 * - **sortByPrice**
 * - **sortByStatus**
 * - **sortBySeatRow**
 * - **sortBySeatNumber**
 *
 * @example
 * SeatMapSortSchema.parse({
 *   sortByPrice: 1,
 *   sortBySeatRow: -1
 * });
 */
export const SeatMapSortSchema = z.object({
    sortByPrice: MongooseSortOrderSchema.optional(),
    sortByStatus: MongooseSortOrderSchema.optional(),
    sortBySeatRow: MongooseSortOrderSchema.optional(),
    sortBySeatNumber: MongooseSortOrderSchema.optional(),
});

/**
 * ## SeatMapQueryOptionSchema
 *
 * A combined schema merging **filters** and **sorting** options into a single
 * query object. Useful for API endpoints or service functions that accept
 * configurable criteria for retrieving seat map data.
 *
 * @example
 * SeatMapQueryOptionSchema.parse({
 *   movie: "6530a8121e4f09c92f123abc",
 *   seatType: "VIP",
 *   sortByPrice: 1
 * });
 *
 * @returns A Zod schema combining `SeatMapFilterSchema` and `SeatMapSortSchema`.
 */
export const SeatMapQueryOptionSchema = SeatMapFilterSchema.merge(SeatMapSortSchema);

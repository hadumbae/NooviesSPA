import RequestReturns from "@/common/type/request/RequestReturns.ts";
import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import {SeatsByRowForm} from "@/pages/seats/schema/form/SeatsByRowFormSchema.ts";

/**
 * Parameters required to submit a batch of seats by row.
 *
 * Extends {@link RequestOptions} for additional query configuration
 * and includes the seat data payload.
 */
export type SubmitSeatsByRowParams = RequestOptions & {
    /** The seat data to submit for a specific row */
    data: SeatsByRowForm;
};

/**
 * Interface for a seat submission repository.
 *
 * Provides a method for submitting multiple seats by row to the server.
 */
export interface ISeatSubmitRepository {
    /** The base API URL for seat-related operations */
    _baseURL: string;

    /**
     * Submits multiple seats for a row.
     *
     * @template TReturns - The expected return type, defaults to an array of {@link Seat}.
     * @param params - Submission parameters including data and query options.
     * @returns A promise resolving to {@link RequestReturns} containing the submitted seats.
     *
     * @example
     * ```ts
     * const response = await seatRepository.submitSeatsByRow({
     *   data: { row: "A", seats: [{ seatNumber: 1 }, { seatNumber: 2 }] },
     *   queries: { populate: true }
     * });
     * ```
     */
    submitSeatsByRow<TReturns = Seat[]>(params: SubmitSeatsByRowParams): Promise<RequestReturns<TReturns>>;
}

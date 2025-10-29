import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {
    ISeatSubmitRepository,
    SubmitSeatsByRowParams
} from "@/pages/seats/repositories/seat-submit-repository/SeatSubmitRepository.types.ts";
import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Repository for submitting seat data to the server.
 *
 * Implements {@link ISeatSubmitRepository} to provide a method for submitting
 * multiple seats by row. Handles URL construction and HTTP requests using
 * {@link useFetchAPI}.
 */
const repository: ISeatSubmitRepository = {
    /** The base API URL for seat-related operations */
    _baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/seats`,

    /**
     * Submits multiple seats for a specific row to the server.
     *
     * @template TReturns - Expected return type of the request, defaults to {@link Seat} array.
     * @param params - Submission parameters including seat data and query options.
     * @returns A promise resolving to {@link RequestReturns} containing the submitted seat data.
     *
     * @example
     * ```ts
     * const response = await seatRepository.submitSeatsByRow({
     *   data: { row: "A", seats: [{ seatNumber: 1 }, { seatNumber: 2 }] },
     *   queries: { populate: true }
     * });
     * ```
     */
    submitSeatsByRow<TReturns = Seat[]>(params: SubmitSeatsByRowParams): Promise<RequestReturns<TReturns>> {
        const { data, ...options } = params;
        const url = buildQueryURL({ baseURL: this._baseURL, path: "create/by-row", queries: options });
        return useFetchAPI({ url, data, method: "POST" });
    }
};

export default repository;

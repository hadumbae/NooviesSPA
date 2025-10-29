import {SeatMapPopulatedSchema} from "@/pages/seatmap/schema/SeatMapPopulatedSchema.ts";
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {ShowingDetailsSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

/**
 * Validates both a showing object and its corresponding seat map.
 *
 * Uses `validateData` to validate each input against their respective schemas:
 * - `ShowingDetailsSchema` for the showing.
 * - `SeatMapPopulatedSchema` for the seat map.
 *
 * Returns both validated datasets, along with combined `success` and `error` states
 * indicating whether validation succeeded or failed for either input.
 *
 * @param params - The parameters containing raw showing and seat map data.
 * @param params.showing - The showing object to validate.
 * @param params.seatMap - The seat map object to validate.
 *
 * @returns An object containing:
 * - `data.showing`: The validated showing data (if valid).
 * - `data.seatMap`: The validated seat map data (if valid).
 * - `success`: Boolean indicating if both validations succeeded.
 * - `error`: Any validation error returned by either schema.
 *
 * @example
 * ```ts
 * const { data, success, error } = useValidateShowingAndSeatMap({
 *   showing: showingData,
 *   seatMap: seatMapData,
 * });
 *
 * if (!success) {
 *   console.error("Validation failed:", error);
 * } else {
 *   console.log("Validated showing:", data.showing);
 *   console.log("Validated seat map:", data.seatMap);
 * }
 * ```
 */
export default function useValidateShowingAndSeatMap(params: { showing: Showing; seatMap: SeatMap }) {
    const {showing, seatMap} = params;

    const populatedShowing = validateData({
        schema: ShowingDetailsSchema,
        data: showing,
    });

    const populatedSeatMap = validateData({
        schema: SeatMapPopulatedSchema,
        data: seatMap,
    });

    const success = populatedShowing.success && populatedSeatMap.success;
    const error = populatedShowing.error || populatedSeatMap.error;

    return {
        data: {
            showing: populatedShowing.data,
            seatMap: populatedSeatMap.data,
        },
        success,
        error,
    };
}

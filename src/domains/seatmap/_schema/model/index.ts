import {PopulatedSeatMap, PopulatedSeatMapSchema} from "@/domains/seatmap/_schema/model/PopulatedSeatMapSchema.ts";
import {SeatMapDetails, SeatMapDetailsSchema} from "@/domains/seatmap/_schema/model/SeatMapDetailsSchema.ts";
import {SeatMap, SeatMapSchema} from "@/domains/seatmap/_schema/model/SeatMapSchema.ts";
import {SeatMapWithSeat, SeatMapWithSeatSchema} from "@/domains/seatmap/_schema/model/SeatMapWithSeatSchema.ts";

export {
    SeatMapSchema,
    SeatMapDetailsSchema,
    SeatMapWithSeatSchema,
    PopulatedSeatMapSchema,
}

export type {
    SeatMap,
    SeatMapDetails,
    SeatMapWithSeat,
    PopulatedSeatMap,
}
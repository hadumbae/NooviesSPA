import {PopulatedSeatMap, PopulatedSeatMapSchema} from "@/domains/seatmaps/_schema/model/PopulatedSeatMapSchema.ts";
import {SeatMapDetails, SeatMapDetailsSchema} from "@/domains/seatmaps/_schema/model/SeatMapDetailsSchema.ts";
import {SeatMap, SeatMapSchema} from "@/domains/seatmaps/_schema/model/SeatMapSchema.ts";
import {SeatMapWithSeat, SeatMapWithSeatSchema} from "@/domains/seatmaps/_schema/model/SeatMapWithSeatSchema.ts";

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
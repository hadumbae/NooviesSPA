import {SeatsByRowForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

export type SubmitSeatsByRowParams = RequestOptions & {
    data: SeatsByRowForm
};

export interface ISeatSubmitRepository {
    _baseURL: string;
    submitSeatsByRow<TReturns = Seat[]>(params: SubmitSeatsByRowParams): Promise<RequestReturns<TReturns>>;
}
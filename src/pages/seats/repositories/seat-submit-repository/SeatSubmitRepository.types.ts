import {SeatsByRowForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import {RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";

export type SubmitSeatsByRowParams = RequestOptions & {
    data: SeatsByRowForm
};

export interface ISeatSubmitRepository {
    _baseURL: string;
    submitSeatsByRow<TReturns = Seat[]>(params: SubmitSeatsByRowParams): Promise<FetchReturns<TReturns>>;
}
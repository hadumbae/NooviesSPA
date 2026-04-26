import {SeatCRUDMutationKeys} from "@/domains/seats/_feat/crud-hooks/mutationKeys.ts";
import {useSeatSubmitMutation} from "@/domains/seats/_feat/crud-hooks/useSeatSubmitMutation.ts";
import useSeatDeleteMutation from "@/domains/seats/_feat/crud-hooks/useSeatDeleteMutation.ts";
import {SeatCRUDQueryKeys} from "@/domains/seats/_feat/crud-hooks/queryKeys.ts";
import {useFetchPaginatedSeats} from "@/domains/seats/_feat/crud-hooks/useFetchPaginatedSeats.ts";
import {useFetchSeat} from "@/domains/seats/_feat/crud-hooks/useFetchSeat.ts";
import {useFetchSeatBySlug} from "@/domains/seats/_feat/crud-hooks/useFetchSeatBySlug.ts";
import {useFetchSeats} from "@/domains/seats/_feat/crud-hooks/useFetchSeats.ts";

export {
    SeatCRUDQueryKeys,
    SeatCRUDMutationKeys,
    useSeatSubmitMutation,
    useSeatDeleteMutation,
    useFetchSeat,
    useFetchSeatBySlug,
    useFetchPaginatedSeats,
    useFetchSeats,
}


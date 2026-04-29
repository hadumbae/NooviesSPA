import {useFetchTheatres} from "@/domains/theatres/_feat/crud-hooks/useFetchTheatres.ts";
import {useFetchPaginatedTheatres} from "@/domains/theatres/_feat/crud-hooks/useFetchPaginatedTheatres.ts";
import {useFetchTheatreBySlug} from "@/domains/theatres/_feat/crud-hooks/useFetchTheatreBySlug.ts";
import {TheatreCRUDMutationKeys} from "@/domains/theatres/_feat/crud-hooks/mutationKeys.ts";
import {TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/queryKeys.ts";
import {useTheatreSubmitMutation} from "@/domains/theatres/_feat/crud-hooks/useTheatreSubmitMutation.ts";

export {
    TheatreCRUDQueryKeys,
    TheatreCRUDMutationKeys,
    useFetchTheatres,
    useFetchPaginatedTheatres,
    useFetchTheatreBySlug,
    useTheatreSubmitMutation,
}


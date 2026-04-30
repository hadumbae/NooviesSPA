import {useFetchTheatres} from "@/domains/theatres/_feat/crud-hooks/useFetchTheatres.ts";
import {useFetchPaginatedTheatres} from "@/domains/theatres/_feat/crud-hooks/useFetchPaginatedTheatres.ts";
import {useFetchTheatreBySlug} from "@/domains/theatres/_feat/crud-hooks/useFetchTheatreBySlug.ts";
import {TheatreCRUDMutationKeys} from "@/domains/theatres/_feat/crud-hooks/mutationKeys.ts";
import {TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/queryKeys.ts";
import {useTheatreSubmitMutation} from "@/domains/theatres/_feat/crud-hooks/useTheatreSubmitMutation.ts";
import {useFetchTheatre} from "@/domains/theatres/_feat/crud-hooks/useFetchTheatre.ts";
import {useTheatreDeleteMutation} from "@/domains/theatres/_feat/crud-hooks/useTheatreDeleteMutation.ts";

export {
    TheatreCRUDQueryKeys,
    TheatreCRUDMutationKeys,
    useFetchTheatre,
    useFetchTheatres,
    useFetchPaginatedTheatres,
    useFetchTheatreBySlug,
    useTheatreSubmitMutation,
    useTheatreDeleteMutation,
}


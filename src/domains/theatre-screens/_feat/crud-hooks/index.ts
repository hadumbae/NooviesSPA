import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/queryKeys.ts";
import {useFetchScreens} from "@/domains/theatre-screens/_feat/crud-hooks/useFetchScreens.ts";
import {useFetchScreen} from "@/domains/theatre-screens/_feat/crud-hooks/useFetchScreen.ts";
import {useFetchScreenBySlug} from "@/domains/theatre-screens/_feat/crud-hooks/useFetchScreenBySlug.ts";
import {useFetchPaginatedScreens} from "@/domains/theatre-screens/_feat/crud-hooks/useFetchPaginatedScreens.ts";
import {TheatreScreenCRUDMutationKeys} from "@/domains/theatre-screens/_feat/crud-hooks/mutationKeys.ts";
import {useScreenDeleteMutation} from "@/domains/theatre-screens/_feat/crud-hooks/useScreenDeleteMutation.ts";
import {
    useTheatreScreenSubmitMutation
} from "@/domains/theatre-screens/_feat/crud-hooks/useTheatreScreenSubmitMutation.ts";

export {
    TheatreScreenCRUDQueryKeys,
    TheatreScreenCRUDMutationKeys,
    useFetchScreen,
    useFetchScreens,
    useFetchScreenBySlug,
    useFetchPaginatedScreens,
    useTheatreScreenSubmitMutation,
    useScreenDeleteMutation,
}



import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/queryKeys.ts";
import {useFetchScreens} from "@/domains/theatre-screens/_feat/crud-hooks/useFetchScreens.ts";
import {useFetchScreen} from "@/domains/theatre-screens/_feat/crud-hooks/useFetchScreen.ts";
import {useFetchScreenBySlug} from "@/domains/theatre-screens/_feat/crud-hooks/useFetchScreenBySlug.ts";
import {useFetchPaginatedScreens} from "@/domains/theatre-screens/_feat/crud-hooks/useFetchPaginatedScreens.ts";

export {
    TheatreScreenCRUDQueryKeys,
    useFetchScreen,
    useFetchScreens,
    useFetchScreenBySlug,
    useFetchPaginatedScreens,
}

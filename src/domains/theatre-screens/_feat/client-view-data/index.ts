import {ScreenBrowseBaseURL} from "@/domains/theatre-screens/_feat/client-view-data/repository/baseURL.ts";
import {fetchScreensWithShowings} from "@/domains/theatre-screens/_feat/client-view-data/repository/repository.ts";
import {
    FetchScreensWithShowingsConfig
} from "@/domains/theatre-screens/_feat/client-view-data/repository/repository.types.ts";
import {TheatreScreenClientViewQueryKeys} from "@/domains/theatre-screens/_feat/client-view-data/queryKeys.ts";
import {
    useFetchScreensWithShowings
} from "@/domains/theatre-screens/_feat/client-view-data/useFetchScreensWithShowings.ts";

export {
    ScreenBrowseBaseURL,
    fetchScreensWithShowings,
    TheatreScreenClientViewQueryKeys,
    useFetchScreensWithShowings,
}

export type {
    FetchScreensWithShowingsConfig,
}
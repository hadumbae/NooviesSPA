import {SearchTheatreQueryKeys} from "@/domains/theatres/_feat/search-theatres/queryKeys.ts";
import {SearchTheatreBaseURL} from "@/domains/theatres/_feat/search-theatres/baseURL.ts";
import {theatresByLocation} from "@/domains/theatres/_feat/search-theatres/repository.ts";
import {BrowseTheatreByLocationConfig} from "@/domains/theatres/_feat/search-theatres/repository.types.ts";
import {useFetchTheatresByLocation} from "@/domains/theatres/_feat/search-theatres/useFetchTheatresByLocation.ts";


export {
    SearchTheatreQueryKeys,
    SearchTheatreBaseURL,
    theatresByLocation,
    useFetchTheatresByLocation,
}

export type {
    BrowseTheatreByLocationConfig,
}
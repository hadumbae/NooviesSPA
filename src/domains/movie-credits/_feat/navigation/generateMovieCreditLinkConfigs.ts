/**
 * @fileoverview Generates grouped navigation link configurations from movie credit data.
 */

import {LinkItemConfig} from "@/common/_types/navigation/LinkItemConfig.ts";
import {mapCreditToPersonLinkConfig} from "@/domains/movie-credits/_feat/navigation/mapCreditToPersonLinkConfig.ts";

import {MovieCreditDetails} from "@/domains/movie-credits/_schemas/model/MovieCreditDetailsSchema.ts";

/** Parameters for the movie credit link configuration generator. */
type ConfigParams = {
    sourceComponent?: string;
    credits: MovieCreditDetails[];
};

/** Link configurations grouped by actor, director, and writer roles. */
type ConfigReturns = {
    actors: LinkItemConfig[];
    directors: LinkItemConfig[];
    writers: LinkItemConfig[];
};

/** Transforms movie credits into grouped navigation link configs based on role and priority. */
export function generateMovieCreditLinkConfigs(
    params: ConfigParams,
): ConfigReturns {
    const {sourceComponent, credits} = params;

    const actors: LinkItemConfig[] = [];
    const directors: LinkItemConfig[] = [];
    const writers: LinkItemConfig[] = [];

    for (const credit of credits) {
        const {department, isPrimary, roleType: {category}} = credit;

        const link = mapCreditToPersonLinkConfig({
            credit,
            sourceComponent,
        });

        if (department === "CREW") {
            if (category === "Director") directors.push(link);
            if (category === "Writer") writers.push(link);
        }

        if (department === "CAST" && category === "Actor" && isPrimary) {
            actors.push(link);
        }
    }

    return {actors, directors, writers};
}

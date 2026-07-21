/**
 * @fileoverview Hook for managing default form values for movie query options.
 */

import {QueryOptionFormValues} from "@/common/_feat";
import {MovieQueryOptionFormValues, MovieQueryOptions} from "@/domains/movies";
import {useRef} from "react";
import {isEqual} from "lodash";

/**
 * Computes and memoizes the default values for the movie query option form based on
 * provided query options and presets.
 */
export function useMovieQueryOptionFormDefaultValues(
    {queryOptions, presetValues}: QueryOptionFormValues<MovieQueryOptionFormValues, MovieQueryOptions>
): MovieQueryOptionFormValues {
    const initialValues: MovieQueryOptionFormValues = {
        _id: "",
        title: "",
        originalTitle: "",
        releaseDate: "",
        isReleased: "",
        isAvailable: "",
        country: "",
        sortByReleaseDate: "",
        sortByTitle: "",
        sortByOriginalTitle: "",
        sortByIsReleased: "",
        sortByIsAvailable: "",
        sortByCountry: "",
        ...queryOptions,
        ...presetValues,
    };

    const defaultValues = useRef<MovieQueryOptionFormValues>(initialValues);

    if (!isEqual(initialValues, defaultValues.current)) {
        defaultValues.current = initialValues;
    }

    return defaultValues.current;
}
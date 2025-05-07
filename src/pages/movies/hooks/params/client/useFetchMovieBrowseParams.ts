import {useNavigate, useParams} from "react-router-dom";
import {IDString, ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {toast} from "react-toastify";
import {useEffect, useMemo} from "react";

/**
 * Custom hook to read and validate a `movieID` route parameter, with optional redirection on failure.
 *
 * This hook attempts to parse the `movieID` URL parameter into an `ObjectId`. If parsing fails
 * (i.e. the ID is missing or invalid), it shows an error toast and navigates the user to a fallback
 * route.
 *
 * @template ObjectId - The type representing a valid movie identifier.
 *
 * @param params - Optional configuration object.
 * @param params.navigateLink - Custom path to redirect to if the `movieID` is invalid.
 *                               Defaults to `"/browse/movies"` when not provided.
 *
 * @returns The parsed `ObjectId` if valid; otherwise `undefined`.
 */
export default function useFetchMovieBrowseParams(params?: { navigateLink?: string }): ObjectId | undefined {
    const {navigateLink} = params || {};

    const navigate = useNavigate();
    const {movieID} = useParams<{ movieID: ObjectId }>();

    const parsedMovieID = useMemo(() => {
        const {success, data} = IDString.safeParse(movieID);
        return success && data ? data : undefined;
    }, [movieID]);

    useEffect(() => {
        if (!parsedMovieID) {
            toast.error("Oops. We couldn't find the movie!");
            navigate(navigateLink ?? "/browse/movies");
        }
    }, [parsedMovieID, navigate, navigateLink]);

    return parsedMovieID
}
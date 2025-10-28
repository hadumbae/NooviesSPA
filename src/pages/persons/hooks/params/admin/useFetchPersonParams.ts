import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

type FetchParams = {
    /**
     * Optional route to redirect to if the person ID is invalid.
     * Defaults to `/admin/persons`.
     */
    navigateLink?: string,
}

/**
 * Custom hook to extract and validate the `personID` URL parameter.
 *
 * - Validates the `personID` using {@link IDStringSchema}.
 * - Redirects and displays an error toast if the ID is invalid.
 *
 * @param params - Optional parameters to configure navigation behavior.
 * @returns An object containing the validated `personID`, or `null` if invalid.
 */
export default function useFetchPersonParams(params?: FetchParams) {
    const navigate = useLoggedNavigate();
    const {navigateLink = "/admin/persons"} = params || {};

    const { personID } = useParams<{personID: string}>();
    const {success, data} = IDStringSchema.safeParse(personID);

    useEffect(() => {
        if (!success) {
            toast.error("Invalid Person Identifier. Please try again.");
            navigate({
                level: "warn",
                to: navigateLink,
                message: "Failed to fetch person ID. ID either does not exist or is invalid.",
            });
        }
    }, [navigate, navigateLink, success, data]);

    if (!success || !data) return null;

    return {
        personID: data,
    };
}
import {ParseError} from "@/common/errors/ParseError.ts";
import {toast} from "react-toastify";

/**
 * Handles mutation errors by categorizing them and displaying
 * user-friendly messages while logging relevant debug info.
 */
export default function handleMutationResponseError(error: unknown) {
    if (error instanceof ParseError) {
        const {message, errors, raw} = error;
        toast(message ?? "Invalid data returned. Please try again.");

        console.group("ParseError Details");
        console.error("Validation Issues: ", errors);
        console.error("Raw Data: ", raw);
        console.groupEnd();

        return;
    }

    if (error instanceof Error) {
        const {message} = error;
        toast.error(message ?? "Oops. Something went wrong. Please try again.");
        console.log("Mutation Error: ", error);
    } else {
        toast.error("An unknown error occurred. Please try again.");
        console.error("Unknown Error: ", error);
    }

}
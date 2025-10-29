import {useParams} from "react-router-dom";
import {IDStringSchema, ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useEffect, useRef} from "react";
import {toast} from "react-toastify";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useFetchMovieBrowseParams from "@/pages/movies/hooks/params/client/useFetchMovieBrowseParams.ts";

export default function useFetchMoviePersonParams(): {movieID: ObjectId, creditID: ObjectId} | null {
    const navigate = useLoggedNavigate();

    const hasNavigated = useRef<boolean>(false);
    const {movieID, creditID} = useParams();

    const {success: movieSuccess, data: parsedMovieID} = IDStringSchema.safeParse(movieID);
    const {success: creditSuccess, data: parsedCreditID} = IDStringSchema.safeParse(creditID);

    useEffect(() => {
        if (hasNavigated.current) return;

        if (!movieSuccess || !parsedMovieID) {
            toast.error("Invalid Movie ID.");
            hasNavigated.current = true;

            navigate({
                to: "/admin/movies",
                component: useFetchMovieBrowseParams.name,
                message: "Failed to fetch movie ID. The ID either does not exist or is not valid.",
            });

            return;
        }

        if (!creditSuccess || !parsedCreditID) {
            toast.error("No valid ID  for person found.");
            hasNavigated.current = true;

            navigate({
                to: `/admin/movies/get/${parsedMovieID}`,
                component: useFetchMovieBrowseParams.name,
                message: "Failed to fetch credit ID. Movie ID exists, but credit ID is missing or invalid.",
            });

            return;
        }
    }, [movieSuccess, parsedMovieID, creditSuccess, parsedCreditID]);

    if (!movieSuccess || !creditSuccess || !parsedMovieID || !parsedCreditID) {
        return null;
    }

    return {
        movieID: parsedMovieID,
        creditID: parsedCreditID,
    };
}
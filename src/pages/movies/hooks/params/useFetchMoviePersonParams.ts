import {useNavigate, useParams} from "react-router-dom";
import {IDStringSchema, ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {useEffect, useRef} from "react";
import {toast} from "react-toastify";

export default function useFetchMoviePersonParams(): {movieID: ObjectId, creditID: ObjectId} | null {
    const navigate = useNavigate();

    const hasNavigated = useRef<boolean>(false);
    const {movieID, creditID} = useParams();

    const {success: movieSuccess, data: parsedMovieID} = IDStringSchema.safeParse(movieID);
    const {success: creditSuccess, data: parsedCreditID} = IDStringSchema.safeParse(creditID);

    useEffect(() => {
        if (hasNavigated.current) return;

        if (!movieSuccess || !parsedMovieID) {
            toast.error("Invalid Movie ID.");
            hasNavigated.current = true;

            navigate("/admin/movies");
            return;
        }

        if (!creditSuccess || !parsedCreditID) {
            toast.error("No valid ID  for person found.");
            hasNavigated.current = true;

            navigate(`/admin/movies/get/${parsedMovieID}`);
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
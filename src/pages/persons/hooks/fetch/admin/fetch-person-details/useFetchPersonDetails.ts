import useFetchPerson from "@/pages/persons/hooks/fetch/useFetchPerson.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useFetchMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {
    MovieCreditPopulatedArraySchema,
} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedArraySchema.ts";
import {
    FetchPersonDetailsReturns
} from "@/pages/persons/hooks/fetch/admin/fetch-person-details/FetchPersonDetailsReturns.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";

export default function useFetchPersonDetails(
    {_id}: { _id: ObjectId }
): FetchPersonDetailsReturns {
    const personQuery = useFetchPerson({_id, populate: false, virtuals: false});
    const creditQuery = useFetchMovieCredits({person: _id, populate: true, limit: 6});
    const queries = [personQuery, creditQuery];

    const isPending = queries.some((query) => query.isPending);
    const isError = queries.some((query) => query.isError);
    const queryError = queries.find((query) => query.isError)?.error ?? null;

    const personValidation = useValidateData<typeof PersonSchema>({
        isPending: personQuery.isPending,
        data: personQuery.data,
        schema: PersonSchema,
        message: "Invalid Person Data."
    });

    const creditValidation = useValidateData({
        isPending: creditQuery.isPending,
        data: creditQuery.data,
        schema: MovieCreditPopulatedArraySchema,
        message: "Invalid Person Data."
    });

    const parseSuccess = personValidation.success && creditValidation.success;
    const baseParams = {isPending, isError, queryError};

    if (!parseSuccess) {
        return {
            ...baseParams,
            data: {person: null, movieCredits: null},
            parseSuccess: false,
            parseError: personValidation.error ?? creditValidation.error ?? null,
        };
    }

    return {
        ...baseParams,
        data: {person: personValidation.data, movieCredits: creditValidation.data},
        parseSuccess: true,
        parseError: null,
    };
}
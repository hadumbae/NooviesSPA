import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {
    PopulatedMovieCreditArray
} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedArraySchema.ts";

type ValidParsedDataResults = {
    data: { person: Person, movieCredits: PopulatedMovieCreditArray }
    parseSuccess: true;
    parseError: null;
}

type InvalidParsedDataResults = {
    data: { person: null, movieCredits: null }
    parseSuccess: false;
    parseError: Error | null;
};

export type FetchPersonDetailsReturns = {
    isPending: boolean;
    isError: boolean;
    queryError: Error | null;
} & (
    | ValidParsedDataResults
    | InvalidParsedDataResults
);
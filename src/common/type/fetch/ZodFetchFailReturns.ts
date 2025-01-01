import {ZodIssue} from "zod";

type ZodFetchFailReturns = {
    message: string;
    errors: ZodIssue[];
}

export default ZodFetchFailReturns;
import {FetchError} from "@/common/errors/FetchError.ts";

export const isError = (error: unknown | any) => error instanceof Error;
export const isFetchError = (error: unknown | any) => error instanceof FetchError;
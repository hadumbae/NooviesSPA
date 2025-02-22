import {ParseError} from "@/common/errors/ParseError.ts";

export const isError = (error: unknown | any) => error instanceof Error;
export const isFetchError = (error: unknown | any) => error instanceof ParseError;
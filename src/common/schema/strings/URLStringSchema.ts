import {z} from "zod";

export const URLStringSchema = z
    .string()
    .url({message: "Must be a valid URL."});
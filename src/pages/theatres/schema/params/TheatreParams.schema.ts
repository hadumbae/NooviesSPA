import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

export const TheatreParamSchema = z.object({
    theatreID: IDStringSchema,
});


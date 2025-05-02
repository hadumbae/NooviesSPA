import {z, type ZodType} from "zod";
import {TrimmedStringSchema, URLString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";

export const CloudinaryImageObject: ZodType<ICloudinaryImage> = z.object({
    public_id: TrimmedStringSchema,
    secure_url: URLString,
});

import {z, type ZodType} from "zod";
import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";

export const CloudinaryImageObject: ZodType<ICloudinaryImage> = z.object({
    public_id: NonEmptyStringSchema,
    secure_url: URLStringSchema,
});

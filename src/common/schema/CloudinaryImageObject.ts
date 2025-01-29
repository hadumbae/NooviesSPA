import {z, type ZodType} from "zod";
import {RequiredString, URLString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";

export const CloudinaryImageObject: ZodType<ICloudinaryImage> = z.object({
    public_id: RequiredString,
    secure_url: URLString,
});

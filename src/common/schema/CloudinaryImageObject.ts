import {z, type ZodType} from "zod";
import {RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";

export const CloudinaryImageObject: ZodType<ICloudinaryImage> = z.object({
    public_id: RequiredString,
    secure_url: RequiredString
        .url("Must be a valid URL."),
});

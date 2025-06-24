import {z, type ZodType} from "zod";
import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";

/**
 * Raw Zod schema for validating a Cloudinary image object.
 *
 * This schema is used to ensure that an object returned from Cloudinary
 * includes all the required fields in their expected formats.
 *
 * Fields include:
 * - `public_id`: A unique identifier for the image in Cloudinary.
 * - `secure_url`: The HTTPS-accessible URL of the image.
 * - `version`: A positive version number assigned by Cloudinary.
 * - `width`, `height`: Dimensions of the image in pixels.
 * - `format`: File format of the image (e.g. jpg, png).
 * - `resource_type`: The type of media (usually "image").
 * - `bytes`: The size of the image in bytes.
 * - `type`: Delivery type (e.g. "upload").
 * - `etag`: Entity tag used for caching.
 * - `url`: Non-secure HTTP URL for the image.
 * - `signature`: A signature for secure validation.
 */
const CloudinaryImageObjectRawSchema = z.object({
    public_id: NonEmptyStringSchema,
    secure_url: URLStringSchema,
    version: PositiveNumberSchema,
    width: NonNegativeNumberSchema,
    height: NonNegativeNumberSchema,
    format: NonEmptyStringSchema,
    resource_type: NonEmptyStringSchema,
    bytes: NonNegativeNumberSchema,
    type: NonEmptyStringSchema,
    etag: NonEmptyStringSchema,
    url: URLStringSchema,
    signature: NonEmptyStringSchema,
});

/**
 * Strongly-typed schema for Cloudinary image objects that conforms to the {@link ICloudinaryImage} interface.
 *
 * This ensures both runtime validation with Zod and compile-time type safety.
 */
export const CloudinaryImageObjectSchema = CloudinaryImageObjectRawSchema satisfies ZodType<ICloudinaryImage>;

/**
 * Inferred TypeScript type for a valid Cloudinary image object.
 *
 * Equivalent to {@link ICloudinaryImage}, but directly inferred from {@link CloudinaryImageObjectSchema}.
 */
export type CloudinaryImageObject = z.infer<typeof CloudinaryImageObjectSchema>;
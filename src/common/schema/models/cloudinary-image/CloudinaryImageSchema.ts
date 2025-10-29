import { z} from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { URLStringSchema } from "@/common/schema/strings/URLStringSchema.ts";
import { NonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Zod schema representing a Cloudinary image object.
 *
 * Validates all standard Cloudinary image properties including:
 * - `public_id`: Cloudinary public ID of the image.
 * - `secure_url` / `url`: Fully qualified URLs for the image.
 * - `version`: Cloudinary version number (positive number).
 * - `width` / `height`: Image dimensions (non-negative numbers).
 * - `format`: Image format (e.g., jpg, png).
 * - `resource_type`: Cloudinary resource type (usually "image").
 * - `bytes`: File size in bytes (non-negative number).
 * - `type`: Storage type (e.g., upload).
 * - `etag` / `signature`: Cloudinary validation signatures.
 *
 * @example
 * ```ts
 * const img: CloudinaryImage = {
 *   public_id: "sample",
 *   secure_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
 *   version: 1234567890,
 *   width: 800,
 *   height: 600,
 *   format: "jpg",
 *   resource_type: "image",
 *   bytes: 123456,
 *   type: "upload",
 *   etag: "abc123",
 *   url: "http://res.cloudinary.com/demo/image/upload/sample.jpg",
 *   signature: "xyz987"
 * };
 * ```
 */
export const CloudinaryImageSchema = z.object({
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
 * TypeScript type inferred from `CloudinaryImageSchema`.
 */
export type CloudinaryImage = z.infer<typeof CloudinaryImageSchema>;

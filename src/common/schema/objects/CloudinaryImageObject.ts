import {z, type ZodType} from "zod";
import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/NonNegativeNumberSchema.ts";
import {UnixTimestampSchema} from "@/common/schema/numbers/UnixTimestampSchema.ts";

/**
 * A Zod object schema for validating a Cloudinary image object.
 *
 * This schema ensures that all required fields are present and correctly typed
 * according to the {@link ICloudinaryImage} interface. It uses stricter reusable
 * schemas (e.g., `NonEmptyStringSchema`, `URLStringSchema`) to enforce strong validation rules.
 *
 * @remarks
 * Useful when validating API responses or normalizing image upload metadata.
 *
 * @example
 * ```ts
 * CloudinaryImageObject.parse({
 *   public_id: "sample",
 *   secure_url: "https://res.cloudinary.com/demo/image/upload/v1/sample.jpg",
 *   version: 1717599032,
 *   width: 800,
 *   height: 600,
 *   format: "jpg",
 *   resource_type: "image",
 *   bytes: 123456,
 *   type: "upload",
 *   etag: "abc123etag",
 *   url: "http://res.cloudinary.com/demo/image/upload/v1/sample.jpg",
 *   signature: "securehashsignature",
 *   original_filename: "sample"
 * });
 * ```
 */
const CloudinaryImageObjectRawSchema = z.object({
    public_id: NonEmptyStringSchema,
    secure_url: URLStringSchema,
    version: UnixTimestampSchema,
    width: NonNegativeNumberSchema,
    height: NonNegativeNumberSchema,
    format: NonEmptyStringSchema,
    resource_type: NonEmptyStringSchema,
    bytes: NonNegativeNumberSchema,
    type: NonEmptyStringSchema,
    etag: NonEmptyStringSchema,
    url: URLStringSchema,
    signature: NonEmptyStringSchema,
    original_filename: NonEmptyStringSchema,
});

/**
 * A validated Cloudinary image schema that satisfies the {@link ICloudinaryImage} TypeScript interface.
 *
 * This ensures both runtime validation (via Zod) and compile-time type safety (via `satisfies`).
 */
export const CloudinaryImageObject = CloudinaryImageObjectRawSchema satisfies ZodType<ICloudinaryImage>;

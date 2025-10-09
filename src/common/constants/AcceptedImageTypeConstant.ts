/**
 * A readonly list of accepted MIME types for image uploads.
 *
 * @remarks
 * This constant defines the valid image formats permitted for upload
 * across the application. It is primarily used for validating user-uploaded
 * files in conjunction with Zod refinements or other file validation logic.
 *
 * @example
 * ```ts
 * ACCEPTED_IMAGE_TYPES.includes(file.type); // true if file.type is a valid image MIME type
 * ```
 *
 * @see {@link refineRequireImageFile} - Utility for validating image uploads using Zod.
 */
const ACCEPTED_IMAGE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/avif",
] satisfies readonly string[];

export default ACCEPTED_IMAGE_TYPES;

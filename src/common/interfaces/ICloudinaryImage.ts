import {PositiveNumber} from "@/common/schema/numbers/positive-number/PositiveNumber.types.ts";

/**
 * Represents metadata for an image stored on Cloudinary.
 *
 * This interface describes the typical structure returned by Cloudinary's API for a single image asset.
 *
 * @see https://cloudinary.com/documentation/image_upload_api_reference
 */
export default interface ICloudinaryImage {
    // Unique identifier for the image within Cloudinary. Used to reference, transform, or delete the image.
    public_id: string;

    // HTTPS URL to access the image securely.
    secure_url: string;

    // Unix timestamp (in seconds) indicating when the image was uploaded or last modified.
    version: PositiveNumber;

    // Width of the image in pixels.
    width: number;

    // Height of the image in pixels.
    height: number;

    // File format of the image (e.g., `"jpg"`, `"png"`, `"webp"`).
    format: string;

    // Resource type (typically `"image"`, but could also be `"raw"` or `"video"`).
    resource_type: string;

    // Size of the image file in bytes.
    bytes: number;

    // Delivery type (e.g., `"upload"`, `"fetch"`, `"private"`).
    type: string;

    // Unique ETag used to identify the image version (useful for caching).
    etag: string;

    // HTTP (non-secure) URL to access the image.
    url: string;

    // Signature hash generated by Cloudinary for this image, used for verification.
    signature: string;
}
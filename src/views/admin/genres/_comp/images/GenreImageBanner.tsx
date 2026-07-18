/**
 * @fileoverview Component for displaying a genre banner image with fallback states.
 */

import {ReactElement, useState} from "react";
import {ImageOff} from "lucide-react";
import {cn} from "@/common/_feat";
import {CloudinaryImage} from "@/common/_schemas/cloudinary-image/CloudinaryImageSchema.ts";

/** Props for the GenreImageBanner component. */
type BannerProps = {
    image?: CloudinaryImage | null;
    genreName: string;
    className?: string;
};

/**
 * Renders a genre banner image or a placeholder if the image is missing or fails to load.
 */
export function GenreImageBanner(
    {image, genreName, className}: BannerProps
): ReactElement {
    const [hasError, setHasError] = useState<boolean>(false);

    if (!image) {
        return (
            <div className={cn("invalid-image-container", className)}>
                <ImageOff/> {hasError && <span>Failed To Fetch Image</span>}
            </div>
        )
    }

    return (
        <img
            src={image.secure_url}
            alt={`Image for '${genreName}'`}
            loading="lazy"
            onError={() => setHasError(true)}
            className={cn(
                "object-cover object-center rounded-md",
                className
            )}
        />
    );
}
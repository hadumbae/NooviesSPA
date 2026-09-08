/**
 * @fileoverview A reusable image component with error handling and placeholder support.
 */

import {ImgHTMLAttributes, ReactElement, useState} from "react";
import {NoImagePlaceholder} from "@/views/common/_comp";
import {URLString} from "@/common/_schemas/strings/simple-strings/URLStringSchema.ts";
import {cn} from "@/common/_feat";

/** Props for the Image component. */
type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> & {
    errorText?: string;
    src?: URLString | null;
};

/** Renders an image with a fallback to a placeholder if the source is missing or fails to load. */
export function Image(
    {src, alt, errorText, className, ...htmlProps}: ImageProps
): ReactElement {
    const [hasError, setHasError] = useState<boolean>(false);

    if (!src || hasError) {
        return (
            <NoImagePlaceholder
                hasError={hasError}
                errorText={errorText}
                className={className}
            />
        );
    }

    return (
        <img
            {...htmlProps}
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className={cn(
                "object-center object-cover",
                className,
            )}
        />
    );
}
/**
 * @fileoverview A reusable image component with error handling and placeholder support.
 */

import {ReactElement, useState} from "react";
import {NoImagePlaceholder} from "@/views/common/_comp";
import {URLString} from "@/common/_schemas/strings/simple-strings/URLStringSchema.ts";
import {cn} from "@/common/_feat";

/** Props for the Image component. */
type ImageProps = {
    errorText?: string;
    src?: URLString | null;
    alt?: string;
    classNames?: {
        image?: string;
        error?: string;
    }
};

/** Renders an image with a fallback to a placeholder if the source is missing or fails to load. */
export function Image(
    {src, alt, errorText, classNames}: ImageProps
): ReactElement {
    const [hasError, setHasError] = useState<boolean>(false);

    if (!src || hasError) {
        return (
            <NoImagePlaceholder
                hasError={hasError}
                errorText={errorText}
                className={classNames?.error}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className={cn(
                "object-center object-cover",
                classNames?.image
            )}
        />
    );
}
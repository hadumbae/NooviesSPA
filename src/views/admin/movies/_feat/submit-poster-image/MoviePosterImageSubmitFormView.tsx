/**
 * @fileoverview Form view for uploading and submitting movie poster images.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {HookFormFileInput} from "@/common/components/forms/HookFormFileInput.tsx";
import ACCEPTED_IMAGE_TYPES from "@/common/constants/AcceptedImageTypeConstant.ts";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

/** Props for the MoviePosterImageSubmitFormView component. */
type ViewProps = {
    className?: string;
};

/**
 * Form view component for movie poster image uploads.
 */
export function MoviePosterImageSubmitFormView(
    {className}: ViewProps
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseFormContext();

    const acceptedFileTypes = ACCEPTED_IMAGE_TYPES
        .map((t) => t.replace("image/", "").toUpperCase())
        .join(", ");

    const fileInputDescription = `Accepted File Types: ${acceptedFileTypes}`;

    return (
        <div className={cn("space-y-4", className)}>
            <HookFormFileInput
                name="posterImage"
                label="Poster Image"
                control={control}
                disabled={isPending}
                description={fileInputDescription}
            />
        </div>
    );
}

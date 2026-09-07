/**
 * @fileoverview Form view component for selecting and uploading movie image files.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/_feat";
import {HookFormFileInput} from "@/views/common/_feat";
import {AcceptedImageTypeConstant} from "@/common/_const/images/AcceptedImageTypeConstant.ts";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

/** Props for the MovieImageSubmitFormView component. */
type ViewProps = {
    className?: string;
};

/**
 * Form input section for choosing a movie image file, displaying supported image formats.
 * Requires wrapping in a BaseFormContext provider.
 */
export function MovieImageSubmitFormView(
    {className}: ViewProps
): ReactElement {
    const {isPending} = useBaseFormContext();

    const acceptedFileTypes = AcceptedImageTypeConstant
        .map((t) => t.replace("image/", "").toUpperCase())
        .join(", ");

    const fileInputDescription = `Accepted File Types: ${acceptedFileTypes}`;

    return (
        <div className={cn("space-y-4", className)}>
            <HookFormFileInput
                name="image"
                label="Image"
                disabled={isPending}
                description={fileInputDescription}
            />
        </div>
    );
}
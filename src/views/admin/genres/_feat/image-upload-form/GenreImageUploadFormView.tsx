/**
 * @fileoverview Form view for uploading or updating a genre image.
 */
import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {useBaseFormContext} from "@/common/features/generic-form-context";
import ACCEPTED_IMAGE_TYPES from "@/common/constants/AcceptedImageTypeConstant.ts";
import {cn} from "@/common/lib/utils.ts";
import HookFormFileInput from "@/common/components/forms/HookFormFileInput.tsx";

/** Props for the GenreImageUploadFormView component. */
type ViewProps = {
    className?: string;
};

/**
 * Renders a file input for genre images.
 */
export function GenreImageUploadFormView(
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
                name="image"
                label="Image"
                control={control}
                description={fileInputDescription}
                disabled={isPending}
            />
        </div>
    );
}
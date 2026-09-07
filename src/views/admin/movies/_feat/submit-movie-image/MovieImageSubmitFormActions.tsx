/**
 * @fileoverview Action buttons container for the movie image submit form.
 */

import {ReactElement} from "react";
import {ImageUp} from "lucide-react";
import {FormPendingSubmitButton} from "@/views/common/_feat";

/** Props for the MovieImageSubmitFormActions component. */
type ActionProps = {
    disabled?: boolean;
    classNames?: {
        container?: string;
        button?: string
    };
};

/**
 * Renders the submit button inside the movie image upload form.
 */
export function MovieImageSubmitFormActions(
    {disabled, classNames}: ActionProps
): ReactElement {
    return (
        <div className={classNames?.container}>
            <FormPendingSubmitButton disabled={disabled} className={classNames?.button}>
                <ImageUp/> Upload
            </FormPendingSubmitButton>
        </div>
    );
}
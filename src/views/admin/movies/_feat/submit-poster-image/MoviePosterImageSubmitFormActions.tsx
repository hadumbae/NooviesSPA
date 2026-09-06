/**
 * @fileoverview Action buttons for submitting the movie poster image form.
 */

import {ReactElement} from "react";
import {ImageUp} from "lucide-react";
import {FormPendingSubmitButton} from "@/views/common/_feat";

/** Props for the MoviePosterImageSubmitFormActions component. */
type ActionProps = {
    classNames?: {
        container?: string;
        button?: string
    };
};

/**
 * Action controls for submitting a movie poster image form.
 */
export function MoviePosterImageSubmitFormActions(
    {classNames}: ActionProps
): ReactElement {
    return (
        <div className={classNames?.container}>
            <FormPendingSubmitButton className={classNames?.button}>
                <ImageUp/> Upload
            </FormPendingSubmitButton>
        </div>
    );
}
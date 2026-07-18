/**
 * @fileoverview Form action buttons for submitting or resetting movie credit data.
 */

import {Button} from "@/common/components/ui";
import {useFormContext} from "react-hook-form";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {cn} from "@/common/_feat";
import {RefreshCw} from "lucide-react";

/** Props for the MovieCreditFormActions component. */
type ActionProps = {
    classNames?: {
        container?: string;
        submit?: string;
        reset?: string;
    };
};

/**
 * Renders submit and reset buttons for the movie credit form.
 */
export function MovieCreditFormActions({classNames}: ActionProps) {
    const {reset} = useFormContext();
    const {formID, isPending} = useBaseFormContext();

    return (
        <div className={cn("grid grid-cols-4 gap-2", classNames?.container)}>
            <Button
                variant="primary"
                type="submit"
                disabled={isPending}
                form={formID}
                className={cn("col-span-3", classNames?.submit)}
            >
                Submit
            </Button>
            <Button
                variant="secondary"
                type="button"
                disabled={isPending}
                onClick={() => reset()}
                className={classNames?.reset}
            >
                <RefreshCw/>
            </Button>
        </div>
    );
}
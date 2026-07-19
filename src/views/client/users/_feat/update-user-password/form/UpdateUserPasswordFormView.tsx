/**
 * @fileoverview Form view for updating a user's password.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {HookFormInput} from "@/views/common/_feat";
import {Button} from "@/views/common/_comp/ui/button.tsx";
import {Loader} from "lucide-react";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

/** Props for the UpdateUserPasswordFormView component. */
type FormProps = {
    className?: string;
}

/**
 * Renders the password update form fields.
 */
export function UpdateUserPasswordFormView(
    {className}: FormProps
): ReactElement {
    const {control} = useFormContext();
    const {formID, isPending} = useBaseFormContext();

    return (
        <div className={cn("space-y-4", className)}>
            <fieldset className="grid grid-cols-3">
                <span className="pt-2">Password</span>

                <HookFormInput
                    name="password"
                    type="password"
                    control={control}
                    className="col-span-2"
                />
            </fieldset>

            <fieldset className="grid grid-cols-3">
                <span className="pt-2">Confirm</span>

                <HookFormInput
                    name="confirm"
                    type="password"
                    control={control}
                    className="col-span-2"
                />
            </fieldset>


            <div className="flex justify-end">
                <Button form={formID} type="submit" variant="primary" className="w-full" disabled={isPending}>
                    {isPending ? <Loader className="animate-spin"/> : "Update"}
                </Button>
            </div>
        </div>
    );
}

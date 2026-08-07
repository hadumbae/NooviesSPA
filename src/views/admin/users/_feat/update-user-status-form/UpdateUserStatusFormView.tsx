/**
 * @fileoverview React component rendering input fields for updating user status within a form context.
 */

import {ReactElement, useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {DisableFields} from "@/common/_types";
import {HookFormSelect} from "@/views/common/_comp";
import {HookFormInput} from "@/views/common/_feat";
import {UpdateUserStatusFormValues, UserStatusUpdateAction} from "@/domains/users/_feat/manage-user-status/schema";
import {
    UserActivateStatusSelectOptions,
    UserDeactivateStatusSelectOptions,
    UserStatusUpdateActionSelectOptions
} from "@/domains/users/_feat/manage-user-status/const";

/** Props for the UpdateUserStatusFormView component. */
type ViewProps = {
    className?: string;
    disableFields?: DisableFields<UpdateUserStatusFormValues>;
};

/**
 * Form view component that renders controls for updating a user's status, action, and moderation message.
 */
export function UpdateUserStatusFormView(
    {className, disableFields}: ViewProps
): ReactElement {
    const {control, watch, setValue} = useFormContext();
    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    const action = watch("action") as UserStatusUpdateAction;

    useEffect(() => {
        if (!isHydrated) {
            setIsHydrated(true);
            return;
        }

        setValue("status", "");
    }, [action]);

    return (
        <div className={cn("space-y-4", className)}>
            <HookFormSelect
                name="action"
                label="Action"
                options={UserStatusUpdateActionSelectOptions}
                disabled={disableFields?.action}
            />

            <HookFormSelect
                name="status"
                label="Status"
                disabled={disableFields?.status}
                options={
                    action === "user_account_activated"
                        ? UserActivateStatusSelectOptions
                        : UserDeactivateStatusSelectOptions
                }
            />

            <HookFormInput
                name="message"
                label="Message"
                control={control}
                disabled={disableFields?.message}
            />
        </div>
    );
}
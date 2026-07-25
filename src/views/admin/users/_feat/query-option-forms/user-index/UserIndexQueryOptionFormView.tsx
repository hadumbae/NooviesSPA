/**
 * @fileoverview View component for the user index query option form.
 */

import {ReactElement} from "react";
import {UserIndexQueryOptionFormValues} from "@/domains/users/_feat/submit-query-options";
import {
    UserIndexQueryOptionFormFilterFieldset
} from "@/views/admin/users/_feat/query-option-forms/user-index/UserIndexQueryOptionFormFilterFieldset.tsx";
import {
    UserIndexQueryOptionFormSortFieldset
} from "@/views/admin/users/_feat/query-option-forms/user-index/UserIndexQueryOptionFormSortFieldset.tsx";
import {Button, Separator} from "@/views/common/_comp/ui";
import {cn, QueryOptionFormViewProps, useAutoFormSubmit, useQueryOptionFormContext} from "@/common/_feat";
import {X} from "lucide-react";

/** Form view for configuring filtering and sorting options for the user index. */
export function UserIndexQueryOptionFormView(
    {disableFields, classNames}: QueryOptionFormViewProps<UserIndexQueryOptionFormValues>
): ReactElement {
    const {submitHandler, resetValues, activeOptions} = useQueryOptionFormContext();
    useAutoFormSubmit({submitHandler, timeout: 450});

    return (
        <div className={cn("space-y-4", classNames?.container)}>
            <UserIndexQueryOptionFormFilterFieldset
                disableFields={disableFields}
                className={classNames?.filters}
            />

            <Separator/>

            <div className="flex max-lg:flex-col max-lg:space-y-4 lg:justify-between lg:items-center">
                <UserIndexQueryOptionFormSortFieldset
                    disableFields={disableFields}
                    className={classNames?.sorts}
                />

                {
                    activeOptions > 0 && (
                        <Button variant="secondary" onClick={resetValues} className="max-lg:w-full">
                            <X/> Clear
                        </Button>
                    )
                }
            </div>

        </div>
    );
}
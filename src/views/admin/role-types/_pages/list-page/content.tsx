/**
 * @fileoverview Presentational component for the Role Type List Page UI.
 */

import {ReactElement, useState} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {PageHeader, SROnly} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {RoleType} from "@/domains/roletypes";
import {RoleTypeDetailsSheet, RoleTypeSubmitForm, RoleTypeSubmitFormPanel} from "@/views/admin/role-types/_feat";
import {Button} from "@/views/common/_comp/ui";
import {Plus} from "lucide-react";
import {
    RoleTypeIndexQueryOptionsFormSection
} from "@/views/admin/role-types/_feat/validate-query-options/roletype-index";

/** Props for the RoleTypeListPageContent component. */
type ContentProps = {
    roleTypes: RoleType[];
};

/**
 * Renders the layout and UI for the Role Type administrative list.
 */
export function RoleTypeListPageContent(
    {roleTypes}: ContentProps
): ReactElement {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [createdTypes, setCreatedTypes] = useState<RoleType[]>([]);

    const onCreated = (roleType: RoleType) => {
        setIsCreating(false);
        setCreatedTypes((prev) => [...prev, roleType]);
    }

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Role Types"
                subtitle="Create And Update Role Types Here."
                actions={
                    <RoleTypeSubmitForm successMessage="Created." resetOnSuccess={true} onSubmitSuccess={onCreated}>
                        <RoleTypeSubmitFormPanel
                            isOpen={isCreating}
                            setIsOpen={setIsCreating}
                            onSubmitConfig={{createdTypes, setCreatedTypes}}
                        >
                            <Button variant="link" size="sm" className="link-button">
                                <Plus/> Create
                            </Button>
                        </RoleTypeSubmitFormPanel>
                    </RoleTypeSubmitForm>
                }
            />

            <RoleTypeIndexQueryOptionsFormSection/>

            {
                roleTypes.length > 0 ? (
                    <section className="space-y-4">
                        <SROnly text="Role Type List"/>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                            {roleTypes.map(rt => <RoleTypeDetailsSheet key={rt._id} roleType={rt}/>)}
                        </div>
                    </section>
                ) : (
                    <EmptyArrayContainer className="flex-1" text="There Are No Role Types"/>
                )
            }
        </PageFlexWrapper>
    );
}


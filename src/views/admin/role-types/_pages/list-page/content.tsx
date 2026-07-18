/**
 * @fileoverview Presentational component for the Role Type List Page UI.
 */

import {ReactElement, useState} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {PaginationRangeButtons, SROnly} from "@/views/common/_comp";
import {RoleTypeListHeader} from "@/views/admin/role-types/_pages/list-page/header.tsx";
import {QueryFilterDialog} from "@/views/common/_feat/dialog/QueryFilterDialog.tsx";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {RoleType} from "@/domains/roletypes";
import {
    RoleTypeDetailsSheet,
    RoleTypeQueryOptionForm,
    RoleTypeQueryOptionFormView
} from "@/views/admin/role-types/_feat";

/** Props for the RoleTypeListPageContent component. */
type ContentProps = {
    roleTypes: RoleType[];
    totalItems: number;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/**
 * Renders the layout and UI for the Role Type administrative list.
 */
export function RoleTypeListPageContent(
    {page, perPage, setPage, roleTypes, totalItems}: ContentProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <PageFlexWrapper>
            <RoleTypeListHeader/>

            <QueryFilterDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Role Type Filters"
                description="Filter and sort role types."
            >
                <RoleTypeQueryOptionForm>
                    <RoleTypeQueryOptionFormView className="p-2"/>
                </RoleTypeQueryOptionForm>
            </QueryFilterDialog>

            {
                roleTypes.length > 0 ? (
                    <section className="space-y-4">
                        <SROnly text="Role Type List"/>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                            {roleTypes.map(rt => <RoleTypeDetailsSheet key={rt._id} roleType={rt}/>)}
                        </div>

                        <PaginationRangeButtons
                            page={page}
                            perPage={perPage}
                            totalItems={totalItems}
                            setPage={setPage}
                        />
                    </section>
                ) : (
                    <EmptyArrayContainer className="flex-1" text="There Are No Role Types"/>
                )
            }
        </PageFlexWrapper>
    );
}


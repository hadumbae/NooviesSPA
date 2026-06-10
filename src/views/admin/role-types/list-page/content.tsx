/**
 * @fileoverview Presentational component for the Role Type List Page UI.
 */

import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {RoleTypeDetailsSheet} from "@/views/admin/role-types/_feat/manage-role-type-sheet";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {RoleTypeListHeader} from "@/views/admin/role-types/list-page/header.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import {RoleTypeQueryOptionForm, RoleTypeQueryOptionFormView} from "@/views/admin/role-types/_feat";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {RoleType} from "@/domains/roletype";
import {ReactElement} from "react";

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
    console.log("Role Types: ", roleTypes);

    return (
        <PageFlexWrapper>
            <RoleTypeListHeader/>

            <PresetFilterDialog
                title="Role Type Filters"
                description="Filter and sort role types."
            >
                <RoleTypeQueryOptionForm>
                    <RoleTypeQueryOptionFormView className="p-2"/>
                </RoleTypeQueryOptionForm>
            </PresetFilterDialog>

            {
                roleTypes.length > 0 ? (
                    <section className="space-y-4">
                        <SectionHeader srOnly={true}>Role Type List</SectionHeader>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                            {roleTypes.map(rt => (
                                <RoleTypeDetailsSheet key={rt._id} roleType={rt}/>
                            ))}
                        </div>

                        <PaginationRangeButtons
                            page={page}
                            perPage={perPage}
                            totalItems={totalItems}
                            setPage={setPage}
                        />
                    </section>
                ) : (
                    <EmptyArrayContainer
                        className="flex-1"
                        text="There Are No Role Types"
                    />
                )
            }
        </PageFlexWrapper>
    );
}


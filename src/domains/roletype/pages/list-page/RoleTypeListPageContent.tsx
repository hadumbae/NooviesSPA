/**
 * @file Presentational component for the Role Type List Page UI.
 * @filename RoleTypeListPageContent.tsx
 */

import {RoleType} from "@/domains/roletype/schema/model/RoleType.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import RoleTypeListSheet from "@/domains/roletype/components/role-type-list-page/list-sheet/RoleTypeListSheet.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import PageFlexWrapper from "@/views/common/_comp/page/PageFlexWrapper.tsx";
import RoleTypeListHeader from "@/domains/roletype/components/role-type-list-page/RoleTypeListHeader.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import RoleTypeQueryOptionFormContainer
    from "@/domains/roletype/components/forms/filters/RoleTypeQueryOptionFormContainer.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

/**
 * Props for the {@link RoleTypeListPageContent} component.
 */
type ContentProps = {
    /** The validated array of role type records to be rendered in the grid. */
    roleTypes: RoleType[];

    /** The total count of items matching the current filter criteria (used for pagination calculations). */
    totalItems: number;

    /** The current active page index. */
    page: number;

    /** The maximum number of records displayed per page. */
    perPage: number;

    /** Callback function to handle page transitions. */
    setPage: (page: number) => void;
};

/**
 * A pure presentational component that renders the layout and UI for the Role Type administrative list.
 * @param props - Configuration including data, metadata, and pagination handlers.
 */
const RoleTypeListPageContent = (
    {page, perPage, setPage, roleTypes, totalItems}: ContentProps
) => {
    console.log("Role Types: ", roleTypes);

    return (
        <PageFlexWrapper>
            <RoleTypeListHeader/>

            <PresetFilterDialog
                title="Role Type Filters"
                description="Filter and sort role types."
            >
                <RoleTypeQueryOptionFormContainer/>
            </PresetFilterDialog>

            {
                roleTypes.length > 0 ? (
                    <section className="space-y-4">
                        <SectionHeader srOnly={true}>Role Type List</SectionHeader>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                            {roleTypes.map(rt => (
                                <RoleTypeListSheet key={rt._id} roleType={rt}/>
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
};

export default RoleTypeListPageContent;
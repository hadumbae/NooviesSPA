/**
 * @file RoleTypeListPageContent.tsx
 *
 * Presentational component responsible for rendering the main content
 * of the Role Type List Page after data has been fetched and validated.
 */

import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import RoleTypeListSheet from "@/pages/roletype/components/role-type-list-page/list-sheet/RoleTypeListSheet.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import RoleTypeListHeader from "@/pages/roletype/components/role-type-list-page/RoleTypeListHeader.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import RoleTypeQueryOptionFormContainer
    from "@/pages/roletype/components/forms/filters/RoleTypeQueryOptionFormContainer.tsx";

/**
 * Props for {@link RoleTypeListPageContent}.
 */
type ContentProps = {
    /**
     * Validated list of role types to display.
     */
    roleTypes: RoleType[];

    /**
     * Total number of role types matching the current filters.
     */
    totalItems: number;

    /**
     * Current pagination page.
     */
    page: number;

    /**
     * Maximum number of items per page.
     */
    perPage: number;

    /**
     * Pagination page setter.
     */
    setPage: (page: number) => void;
};

/**
 * **RoleTypeListPageContent**
 *
 * Stateless presentational component that renders:
 *
 * - Page header and contextual controls
 * - Filter dialog with sorting and filtering options
 * - A responsive grid of role type cards
 * - Pagination controls when applicable
 * - An empty state when no role types exist
 *
 * ### Responsibilities
 * - Render UI based solely on provided props
 * - Perform no data fetching or validation
 *
 * ### Intended Usage
 * Use this component **only after data has been fetched and validated**
 * (e.g., inside {@link ValidatedQueryBoundary}).
 *
 * @param props - {@link ContentProps}
 * @returns Rendered role type list content
 */
const RoleTypeListPageContent = (
    {page, perPage, setPage, roleTypes, totalItems}: ContentProps
) => {
    /**
     * Non-empty role type list section
     */
    const hasRoleTypeSection = (
        <section>
            <SectionHeader srOnly={true}>Role Type List</SectionHeader>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                {roleTypes.map(rt => (
                    <RoleTypeListSheet key={rt._id} roleType={rt}/>
                ))}
            </div>

            {totalItems > perPage && (
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            )}
        </section>
    );

    /**
     * Empty state section
     */
    const noRoleTypeSection = (
        <PageCenter>
            <span className="select-none text-neutral-400">
                There Are No Role Types
            </span>
        </PageCenter>
    );

    return (
        <PageFlexWrapper>
            {/* Page title and header */}
            <RoleTypeListHeader/>

            {/* Filter and sort dialog */}
            <PresetFilterDialog
                title="Role Type Filters"
                description="Filter and sort role types."
            >
                <RoleTypeQueryOptionFormContainer/>
            </PresetFilterDialog>

            {/* Conditional list rendering */}
            {roleTypes.length > 0 ? hasRoleTypeSection : noRoleTypeSection}

            {/* Footer pagination (mirrors top behavior for long lists) */}
            {totalItems > perPage && (
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            )}
        </PageFlexWrapper>
    );
};

export default RoleTypeListPageContent;

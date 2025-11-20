import {FC} from 'react';
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
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";

type ContentProps = {
    /**
     * The list of role types returned by the validated query.
     * Each role type is displayed as a `RoleTypeListSheet` card.
     */
    roleTypes: RoleType[];

    /**
     * Total number of available role types that match the current filters.
     * Used to determine whether pagination controls should be displayed.
     */
    totalItems: number;
};

/**
 * **RoleTypeListPageContent**
 *
 * A presentational component responsible for rendering the **content area**
 * of the Role Type List Page once data has already been loaded and validated.
 *
 * This component does **not** perform fetching; it receives:
 * - The list of role types
 * - The total number of matching items
 *
 * It manages **pagination state** using URL search params and renders:
 *
 * - A page header (`RoleTypeListHeader`)
 * - A preset filter dialog (`PresetFilterDialog`)
 * - A responsive grid of `RoleTypeListSheet` cards
 * - Pagination controls (`PaginationRangeButtons`) when needed
 * - An empty-state message when no items exist
 *
 * ---
 *
 * ### When to use this component
 * Use `RoleTypeListPageContent` inside a larger page or container component
 * once data has been fetched via `useFetchRoleTypes` and validated using
 * `ValidatedQueryBoundary`.
 *
 * @param props - {@link ContentProps} containing the role type items and total count
 * @returns {JSX.Element} The rendered role type list content
 */
const RoleTypeListPageContent: FC<ContentProps> = (props) => {
    // ⚡ State ⚡
    const {roleTypes, totalItems} = props;

    /** Pagination state synchronized with URL search params */
    const {page, perPage, setPage} = usePaginationSearchParams({page: 1, perPage: 25});

    // ⚡ Sections ⚡

    /**
     * Section: Non-empty list of role types
     *
     * Renders:
     * - A semantic section wrapper
     * - A visually-hidden section header
     * - A responsive grid of `RoleTypeListSheet` cards
     * - Pagination controls when the number of items exceeds `perPage`
     */
    const hasRoleTypeSection = (
        <section>
            <SectionHeader srOnly={true}>Role Type List</SectionHeader>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                {roleTypes.map(rt => <RoleTypeListSheet key={rt._id} roleType={rt}/>)}
            </div>

            {
                totalItems > perPage &&
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            }
        </section>
    );

    /**
     * Section: Empty state
     *
     * Renders a centered message indicating that no role types
     * match the current filter or search parameters.
     */
    const noRoleTypeSection = (
        <PageCenter>
            <span className="select-none text-neutral-400">
                There Are No Role Types
            </span>
        </PageCenter>
    );

    // ⚡ Render ⚡

    return (
        <PageFlexWrapper>
            {/** Page title and contextual header */}
            <RoleTypeListHeader/>

            {/** Filter dialog with form-driven sorting and filtering */}
            <PresetFilterDialog title="Role Type Filters" description="Filter And Sort Role Types.">
                <RoleTypeQueryOptionFormContainer/>
            </PresetFilterDialog>

            {/** Conditional rendering based on presence of items */}
            {
                roleTypes.length > 0
                    ? hasRoleTypeSection
                    : noRoleTypeSection
            }

        </PageFlexWrapper>
    );
};

export default RoleTypeListPageContent;

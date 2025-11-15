import {FC} from 'react';
import useFetchRoleTypes from "@/pages/roletype/hooks/fetch/useFetchRoleTypes.ts";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {PaginatedRoleTypeSchema} from "@/pages/roletype/schema/model/RoleType.schema.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {PaginatedRoleTypes} from "@/pages/roletype/schema/model/RoleType.types.ts";
import RoleTypeListHeader from "@/pages/roletype/components/role-type-list-page/RoleTypeListHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import RoleTypeListSheet from "@/pages/roletype/components/role-type-list-page/RoleTypeListSheet.tsx";
import RoleTypeQueryOptionFormContainer from "@/pages/roletype/components/forms/filters/RoleTypeQueryOptionFormContainer.tsx";
import useRoleTypeQueryOptionSearchParams
    from "@/pages/roletype/hooks/params/query-option-search-params/useRoleTypeQueryOptionSearchParams.ts";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";

const RoleTypeListPage: FC = () => {
    const {searchParams: queryOptions} = useRoleTypeQueryOptionSearchParams();
    const {page, perPage, setPage} = usePaginationSearchParams({page: 1, perPage: 25});
    const query = useFetchRoleTypes({
        queries: {paginated: true, page, perPage, ...queryOptions}
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedRoleTypeSchema}>
                {({totalItems, items: roleTypes}: PaginatedRoleTypes) => {

                    return (
                        <PageFlexWrapper>
                            <RoleTypeListHeader/>

                            <PresetFilterDialog title="Role Type Filters" description="Filter And Sort Role Types.">
                                <RoleTypeQueryOptionFormContainer />
                            </PresetFilterDialog>

                            <PageSection className="grid grid-cols-2 gap-2">
                                {roleTypes.map(rt => <RoleTypeListSheet key={rt._id} roleType={rt} />)}
                            </PageSection>

                            {
                                totalItems > perPage &&
                                <PaginationRangeButtons
                                    page={page}
                                    perPage={perPage}
                                    totalItems={totalItems}
                                    setPage={setPage}
                                />
                            }
                        </PageFlexWrapper>
                    )
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default RoleTypeListPage;

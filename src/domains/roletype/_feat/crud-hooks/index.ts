import {RoleTypeCRUDQueryKeys} from "@/domains/roletype/_feat/crud-hooks/queryKeys.ts";
import {useFetchRoleType} from "@/domains/roletype/_feat/crud-hooks/useFetchRoleType.ts";
import {useFetchRoleTypes} from "@/domains/roletype/_feat/crud-hooks/useFetchRoleTypes.ts";
import {useFetchPaginatedRoleTypes} from "@/domains/roletype/_feat/crud-hooks/useFetchPaginatedRoleTypes.ts";
import {RoleTypeCRUDMutationKeys} from "@/domains/roletype/_feat/crud-hooks/mutationKeys.ts";
import {useRoleTypeSubmitMutation} from "@/domains/roletype/_feat/crud-hooks/useRoleTypeSubmitMutation.ts";
import {useRoleTypeDeleteMutation} from "@/domains/roletype/_feat/crud-hooks/useRoleTypeDeleteMutation.ts";

export {
    RoleTypeCRUDQueryKeys,
    RoleTypeCRUDMutationKeys,
    useFetchRoleType,
    useFetchRoleTypes,
    useFetchPaginatedRoleTypes,
    useRoleTypeSubmitMutation,
    useRoleTypeDeleteMutation,
}
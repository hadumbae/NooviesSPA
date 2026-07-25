/**
 * @fileoverview Context provider and hook for managing user index query options.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {UserQueryOptionsSchema} from "@/domains/users/_schema/query-options";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    name: "UserIndexQueryOptionsContext",
    schema: UserQueryOptionsSchema,
});

export {
    /** Provider component for the UserIndexQueryOptionsContext. */
    Provider as UserIndexQueryOptionsContextProvider,
    /** Hook to access the UserIndexQueryOptionsContext. */
    useQueryOptionsContext as useUserIndexQueryOptionsContext,
}
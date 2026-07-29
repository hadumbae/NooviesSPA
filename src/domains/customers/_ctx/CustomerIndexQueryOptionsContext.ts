/**
 * @fileoverview Provides context for managing customer index query options and search parameters.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {CustomerQueryOptionsSchema} from "@/domains/customers/_schema/query-options";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    name: "CustomerIndexQueryOptionsContext",
    schema: CustomerQueryOptionsSchema,
});

export {
    /** Provider component for the customer index query options context. */
        Provider as CustomerIndexQueryOptionsContextProvider,
    /** Hook to access the customer index query options context. */
        useQueryOptionsContext as useCustomerIndexQueryOptionsContext,
}
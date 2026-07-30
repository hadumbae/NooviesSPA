/**
 * @fileoverview Form and hook for managing customer index query options.
 */

import {createQueryOptionForm} from "@/common/_feat";
import {CustomerIndexQueryOptionFormValues} from "@/domains/customers/_types";
import {CustomerQueryOptionsSchema} from "@/domains/customers/_schema/query-options";

const {QueryOptionForm, useQueryOptionForm} = createQueryOptionForm<
    CustomerIndexQueryOptionFormValues,
    typeof CustomerQueryOptionsSchema.shape
>({
    name: "customer-index-query-options",
    schema: CustomerQueryOptionsSchema,
});

export {
    /** Form component for filtering and sorting the customer index list. */
    QueryOptionForm as CustomerIndexQueryOptionForm,
    /** Hook for managing customer index query option form state. */
    useQueryOptionForm as useCustomerIndexQueryOptionForm,
}
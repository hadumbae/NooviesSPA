/**
 * @fileoverview Form section for managing customer index query options.
 */

import {createQueryOptionFormSection} from "@/common/_feat";
import {useCustomerIndexQueryOptionsContext} from "@/domains/customers";
import {CustomerIndexQueryOptionForm, CustomerIndexQueryOptionFormView} from "@/views/admin/customers";

/**
 * A section component for customer index query options.
 * Requires wrapping in a CustomerIndexQueryOptionsProvider.
 */
export const CustomerIndexQueryOptionFormSection = createQueryOptionFormSection({
    formView: CustomerIndexQueryOptionFormView,
    queryOptionForm: CustomerIndexQueryOptionForm,
    useQueryOptionsContext: useCustomerIndexQueryOptionsContext,
});
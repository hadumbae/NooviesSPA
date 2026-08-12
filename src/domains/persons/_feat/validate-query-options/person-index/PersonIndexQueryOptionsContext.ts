/**
 * @fileoverview React context provider and hook for managing person index query options.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {
    PersonIndexQueryOptionSchema
} from "@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionSchema.ts";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    schema: PersonIndexQueryOptionSchema,
    name: "person-index-query-options-context",
})

export {
    /** Context provider component for person index query options. */
        Provider as PersonIndexQueryOptionsContextProvider,
    /** Custom hook to access person index query options from context. */
        useQueryOptionsContext as usePersonIndexQueryOptionsContext,
}
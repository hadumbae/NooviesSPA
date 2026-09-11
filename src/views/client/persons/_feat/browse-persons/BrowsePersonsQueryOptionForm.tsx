import {createQueryOptionForm} from "@/common/_feat";
import {
    BrowsePersonsQueryOptionsSchema
} from "@/domains/persons/_feat/validate-query-options/person-browse/BrowsePersonsQueryOptionsSchema.ts";

const {QueryOptionForm, useQueryOptionForm} = createQueryOptionForm({
    name: "BrowsePersonsQueryOptions",
    schema: BrowsePersonsQueryOptionsSchema,
});

export {
    QueryOptionForm as BrowsePersonsQueryOptionForm,
    useQueryOptionForm as useBrowsePersonsQueryOptionForm,
}
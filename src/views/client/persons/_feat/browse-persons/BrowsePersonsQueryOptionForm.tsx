import {createQueryOptionForm} from "@/common/_feat";
import {BrowsePersonsQueryOptionsSchema} from "@/domains/persons";

const {QueryOptionForm, useQueryOptionForm} = createQueryOptionForm({
    name: "BrowsePersonsQueryOptions",
    schema: BrowsePersonsQueryOptionsSchema,
});

export {
    QueryOptionForm as BrowsePersonsQueryOptionForm,
    useQueryOptionForm as useBrowsePersonsQueryOptionForm,
}
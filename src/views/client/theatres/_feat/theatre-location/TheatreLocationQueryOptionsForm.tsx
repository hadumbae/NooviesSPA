/**
 * @fileoverview Form component and hook for managing theatre location query options state.
 */

import {createQueryOptionForm} from "@/common/_feat";
import {TheatreLocationQueryOptionsSchema} from "@/domains/theatres";

const {useQueryOptionForm, QueryOptionForm} = createQueryOptionForm({
    schema: TheatreLocationQueryOptionsSchema,
    name: "theatre-location-query-options-form",
});

export {
    /** Form component for editing theatre location query options. */
        QueryOptionForm as TheatreLocationQueryOptionForm,
    /** Hook for managing the theatre location query options form state. */
        useQueryOptionForm as useTheatreLocationQueryOptionForm,
}
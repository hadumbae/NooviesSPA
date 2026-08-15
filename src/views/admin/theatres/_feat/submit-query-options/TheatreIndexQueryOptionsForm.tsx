/**
 * @fileoverview Defines the form component and hook for managing theatre index query options.
 */

import {createQueryOptionForm} from "@/common/_feat";
import {TheatreIndexQueryOptionsSchema} from "@/domains/theatres";

const {QueryOptionForm, useQueryOptionForm} = createQueryOptionForm({
    name: "theatre-index-query-options-form",
    schema: TheatreIndexQueryOptionsSchema,
});

export {
    /** React form component for configuring theatre index query options. */
        QueryOptionForm as TheatreIndexQueryOptionsForm,
    /** Custom hook for managing the theatre index query options form state. */
        useQueryOptionForm as useTheatreIndexQueryOptionsForm,
}
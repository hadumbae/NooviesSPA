/**
 * @fileoverview Defines and exports the query option form section for theatre location options.
 */

import {createQueryOptionFormSection} from "@/common/_feat";
import {
    TheatreLocationQueryOptionForm
} from "@/views/client/theatres/_feat/theatre-location/TheatreLocationQueryOptionsForm.tsx";
import {useTheatreLocationQueryOptionsContext} from "@/domains/theatres";
import {
    TheatreLocationQueryOptionsFormView
} from "@/views/client/theatres/_feat/theatre-location/TheatreLocationQueryOptionsFormView.tsx";

const section = createQueryOptionFormSection({
    queryOptionForm: TheatreLocationQueryOptionForm,
    formView: TheatreLocationQueryOptionsFormView,
    useQueryOptionsContext: useTheatreLocationQueryOptionsContext,
});

export {
    /** Form section component integrating the form and view for theatre location query options. */
        section as TheatreLocationQueryOptionsFormSection
}
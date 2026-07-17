/**
 * @fileoverview Fieldset component for rendering sorting options within the theatre query option form.
 */

import {ReactElement} from 'react';
import {HookFormSortToggle} from "@/views/common/_feat";

import {TheatreQueryOptionFormStarterValues} from "@/domains/theatres";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {cn} from "@/common/_feat/handle-ui/cn.ts";

/**
 * Renders a responsive set of sorting toggle controls for theatre query options.
 * Displays toggles for fields marked active in the provided schema mapping.
 */
export function TheatreQueryOptionFormSortFieldset(
    {className, disableFields}: Omit<FormFieldsetProps<TheatreQueryOptionFormStarterValues>, "isNestedView">
): ReactElement {
    return (
        <fieldset className={cn("flex flex-wrap space-x-2", className)}>
            {!disableFields?.sortByName && <HookFormSortToggle name="sortByName" label="Name"/>}
            {!disableFields?.sortBySeatCapacity && <HookFormSortToggle name="sortBySeatCapacity" label="Seat Capacity"/>}
            {!disableFields?.sortByCity && <HookFormSortToggle name="sortByCity" label="City"/>}
            {!disableFields?.sortByState && <HookFormSortToggle name="sortByState" label="State"/>}
            {!disableFields?.sortByCountry && <HookFormSortToggle name="sortByCountry" label="Country"/>}
            {!disableFields?.sortByPostCode && <HookFormSortToggle name="sortByPostCode" label="Post Code"/>}
            {!disableFields?.sortByTimezone && <HookFormSortToggle name="sortByTimezone" label="Timezone"/>}
        </fieldset>
    );
}



/**
 * @fileoverview Utility functions and types for formatting person entity data for editing.
 */

import {AnyValues} from "@/common/_types";
import {Person, PersonFormData} from "@/domains/persons";

/** Type representing editable form field values derived from PersonFormData. */
export type PersonEditData = AnyValues<PersonFormData>;

/**
 * Transforms a Person domain object into a formatted data object for editing.
 */
export function buildPersonEditData(person: Person): PersonEditData {
    const dob = person.dob.toISODate();

    return {
        ...person,
        dob,
    }
}
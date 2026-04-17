import {PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/PersonCRUDQueryKeys.ts";
import {useFetchPaginatedPersons} from "@/domains/persons/_feat/crud-hooks/useFetchPaginatedPersons.ts";
import {useFetchPerson} from "@/domains/persons/_feat/crud-hooks/useFetchPerson.ts";
import useFetchPersons from "@/domains/persons/_feat/crud-hooks/useFetchPersons.ts";
import {useFetchPersonBySlug} from "@/domains/persons/_feat/crud-hooks/useFetchPersonBySlug.ts";
import {useSubmitPersonData} from "@/domains/persons/_feat/crud-hooks/useSubmitPersonData.ts";
import {PersonCRUDMutationKeys} from "@/domains/persons/_feat/crud-hooks/PersonCRUDMutationKeys.ts";
import {useRemovePersonData} from "@/domains/persons/_feat/crud-hooks/useRemovePersonData.ts";

export {
    PersonCRUDQueryKeys,
    PersonCRUDMutationKeys,
    useFetchPaginatedPersons,
    useFetchPerson,
    useFetchPersons,
    useFetchPersonBySlug,
    useSubmitPersonData,
    useRemovePersonData,
}


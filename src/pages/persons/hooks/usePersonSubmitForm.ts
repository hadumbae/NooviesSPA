import {useForm} from "react-hook-form";
import {PersonSubmit, PersonSubmitSchema} from "@/pages/persons/schema/PersonSubmitSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

type PersonSubmitParams = {
    presetValues?: Partial<Person>
    person?: Person;
}

export default function usePersonSubmitForm(params?: PersonSubmitParams) {
    const {presetValues = {}, person} = params || {};

    const defaultValues: PersonSubmit = {
        name: getDefaultValue(presetValues.name, person?.name, "")!,
        biography: getDefaultValue(presetValues.biography, person?.biography, "")!,
        dob: getDefaultValue(presetValues.dob, person?.dob, "")!,
        nationality: getDefaultValue(presetValues.nationality, person?.nationality, ""),
    };

    return useForm<PersonSubmit>({
        resolver: zodResolver(PersonSubmitSchema),
        defaultValues,
    });
}
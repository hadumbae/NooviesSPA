import {
    MutationFormConfig,
    MutationFormResetConfig,
    MutationResponseConfig
} from "@/common/_feat/submit-data/mutationTypes.ts";
import {
    FormConfigProps,
    FormContainerConfigProps,
    FormOptions,
    FormValuesConfig
} from "@/common/_feat/submit-data/formTypes.ts";
import {useAutoFormSubmit} from "@/common/_feat/submit-data/useAutoFormSubmit.ts";
import {closeOnSuccess} from "@/common/_feat/submit-data/closeOnSuccess.ts";
import {renderFields} from "@/common/_feat/submit-data/renderFields.ts";

export {
    useAutoFormSubmit,
    closeOnSuccess,
    renderFields,
}

export type {
    FormValuesConfig,
    FormOptions,
    FormContainerConfigProps,
    MutationFormConfig,
    MutationResponseConfig,
    MutationFormResetConfig,
    FormConfigProps,
}



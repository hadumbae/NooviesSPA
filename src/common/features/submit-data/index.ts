import {
    MutationFormConfig,
    MutationFormResetConfig,
    MutationResponseConfig
} from "@/common/features/submit-data/mutationTypes.ts";
import {FormConfigProps, FormOptions} from "@/common/features/submit-data/formTypes.ts";
import {useAutoFormSubmit} from "@/common/features/submit-data/useAutoFormSubmit.ts";
import {closeOnSuccess} from "@/common/features/submit-data/closeOnSuccess.ts";
import {renderFields} from "@/common/features/submit-data/renderFields.ts";

export {
    useAutoFormSubmit,
    closeOnSuccess,
    renderFields,
}
export type {
    FormOptions,
    MutationFormConfig,
    MutationResponseConfig,
    MutationFormResetConfig,
    FormConfigProps,
}



import {
    MutationFormConfig,
    MutationFormResetConfig,
    MutationResponseConfig
} from "@/common/features/submit-data/mutationTypes.ts";
import {FormOptions} from "@/common/features/submit-data/formTypes.ts";
import {useAutoFormSubmit} from "@/common/features/submit-data/useAutoFormSubmit.ts";
import {closeOnSuccess} from "@/common/features/submit-data/closeOnSuccess.ts";

export {
    useAutoFormSubmit,
    closeOnSuccess,
}

export type {
    FormOptions,
    MutationFormConfig,
    MutationResponseConfig,
    MutationFormResetConfig,
}



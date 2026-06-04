import {
    AuthRegisterForm,
    AuthRegisterFormBaseSchema,
    AuthRegisterFormSchema,
    AuthRegisterFormValues
} from "@/domains/auth/_feat/auth-register-form/schema/AuthRegisterFormSchema.ts";

export * from "./fields";

export {
    AuthRegisterFormBaseSchema,
    AuthRegisterFormSchema,
}

export type {
    AuthRegisterForm,
    AuthRegisterFormValues,
}
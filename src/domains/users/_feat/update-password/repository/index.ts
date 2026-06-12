import {updateUserPassword} from "@/domains/users/_feat/update-password/repository/repository.ts";
import {PasswordUpdateData} from "@/domains/users/_feat/update-password/repository/repository.types.ts";
import {UpdateUserPasswordBaseURL} from "@/domains/users/_feat/update-password/repository/baseURL.ts";

export {
    updateUserPassword,
    UpdateUserPasswordBaseURL,
}

export type {
    PasswordUpdateData,
}
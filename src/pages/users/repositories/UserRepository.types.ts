import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UserPasswordUpdateSubmit} from "@/pages/users/schemas/UserPasswordUpdateSubmitSchema.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";

/**
 * Parameters for updating a user's password.
 */
export type PasswordUpdateData = {
    userID: ObjectId;
    data: UserPasswordUpdateSubmit;
};

/**
 * User data access contract.
 */
export interface UserRepository {
    baseURL: string;

    /**
     * Updates a user's password.
     */
    updatePassword(params: PasswordUpdateData): Promise<RequestReturns>;
}

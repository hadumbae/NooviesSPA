import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import type {UserRepository, PasswordUpdateData} from "./UserRepository.types.ts";

/**
 * User API repository implementation.
 */
const UserRepository: UserRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/users`,

    /**
     * Updates a user's password.
     *
     * @remarks
     * - Issues a PATCH request to the user password update endpoint
     * - Returns a standardized {@link RequestReturns} response
     */
    updatePassword(params: PasswordUpdateData): Promise<RequestReturns> {
        const {userID, data} = params;
        const path = `/update/${userID}/password`;

        const url = buildQueryURL({baseURL: this.baseURL, path});
        return useFetchAPI({url, method: "PATCH", data});
    }
};

export default UserRepository;

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {UserPasswordUpdateSubmit} from "@/pages/users/schemas/UserPasswordUpdateSubmitSchema.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface IUserRepository {
    baseURL: string;
    updatePassword(params:{userID: ObjectId, data: UserPasswordUpdateSubmit}): Promise<RequestReturns>;
}

const UserRepository: IUserRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/users`,

    updatePassword(params: {userID: ObjectId, data: UserPasswordUpdateSubmit}): Promise<RequestReturns> {
        const {userID, data} = params;
        const path = `/update/${userID}/password`;

        const url = buildQueryURL({baseURL: this.baseURL, path});
        return useFetchAPI({url, method: "PATCH", data});
    }
}

export default UserRepository;
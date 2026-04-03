import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/admin/customers/view-data`;

export const getFetchCustomerProfileViewData = (code: UserUniqueCode) => {
    const url = buildQueryURL({
       baseURL,
       path: `profile-details/${code}`,
    });

    return useFetchAPI({method: "GET", url});
}
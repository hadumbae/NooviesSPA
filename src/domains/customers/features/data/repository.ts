import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {
    GetFetchCustomerProfileViewData,
} from "@/domains/customers/features/data/repository.types.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/customers/view-data`;

export const getFetchCustomerProfileViewData = (
    {customerCode}: GetFetchCustomerProfileViewData
) => {
    const url = buildQueryURL({
       baseURL,
       path: `profile-details/${customerCode}`,
    });

    return useFetchAPI({method: "GET", url});
}
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchErrorHandler from "@/common/handlers/query/FetchErrorHandler.ts";
import {AuthUserAdminStatus, AuthUserAdminStatusSchema} from "@/pages/auth/schema/AuthUserAdminStatusSchema.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {AuthUserDetails, AuthUserDetailsSchema} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import Cookies from "js-cookie";

interface IAuthService {
    baseURL: string;

    getAuthUser(): AuthUserDetails | null;

    verifyAdminStatus(params: { authUserID: ObjectId }): Promise<boolean>;
}

const AuthService: IAuthService = {
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,

    getAuthUser(): AuthUserDetails | null {
        if (!Cookies.get("hasAuthToken")) return null;

        const itemDetails = localStorage.getItem("authUser");
        if (!itemDetails) return null;

        try {
            const parsedDetails = JSON.parse(itemDetails);
            return AuthUserDetailsSchema.parse(parsedDetails);
        } catch (e: any) {
            if (e instanceof Error) console.error(e.message);
            return null;
        }
    },

    async verifyAdminStatus({authUserID}: { authUserID: ObjectId }): Promise<boolean> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "admin/verify"});
        const action = () => useFetchAPI({url, method: "GET"});

        const {result: data} = await useFetchErrorHandler({fetchQueryFn: action});
        const schema = AuthUserAdminStatusSchema;

        const {userID, isAdmin} = parseResponseData<typeof schema, AuthUserAdminStatus>({schema, data});
        return isAdmin && userID == authUserID
    }
};

export default AuthService;

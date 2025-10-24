import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import {AuthUserAdminStatusSchema} from "@/pages/auth/schema/AuthUserAdminStatusSchema.ts";
import {AuthUserDetails, AuthUserDetailsSchema} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import Cookies from "js-cookie";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

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

        const {result} = await useFetchAPI({url, method: "GET"});
        const {data, success, error} = validateData({data: result, schema: AuthUserAdminStatusSchema});

        if (!success) throw error;
        const {isAdmin, userID} = data;

        return isAdmin && userID == authUserID
    }
};

export default AuthService;

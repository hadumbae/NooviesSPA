import useFetchAPI from "@/common/utility/useFetchAPI.ts";
import {UserRegisterData} from "@/pages/auth/schema/AuthRegisterSchema.ts";
import {UserLoginData} from "@/pages/auth/schema/AuthLoginSchema.ts";
import buildQueryURL from "@/common/utility/buildQueryURL.ts";
import {AuthUserDetails, AuthUserDetailsSchema} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import useFetchErrorHandler from "@/common/utility/useFetchErrorHandler.ts";
import parseResponseData from "@/common/utility/parseResponseData.ts";

interface IAuthService {
    baseURL: string;
    register(params: {email: string, password: string, confirm: string}): Promise<void>;
    login(params: {email: string, password: string}): Promise<AuthUserDetails>;
}

const AuthService: IAuthService = {
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,

    async register(data: UserRegisterData): Promise<void> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "register"})
        await useFetchErrorHandler({
            fetchQueryFn: () => useFetchAPI({url, method: "POST", data}),
            message: "Failed to register. Please try again."
        });
    },

    async login(data: UserLoginData): Promise<AuthUserDetails> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "login"});
        const {result} = await useFetchErrorHandler({
            fetchQueryFn: () => useFetchAPI({url, method: "POST", data}),
            message: "Failed to login. Please try again.",
        });

        return parseResponseData<typeof AuthUserDetailsSchema, AuthUserDetails>({
            schema: AuthUserDetailsSchema,
            data: result
        });
    }
};

export default AuthService;

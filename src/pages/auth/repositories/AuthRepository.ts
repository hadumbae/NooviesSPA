import {UserRegisterData} from "@/pages/auth/schema/AuthRegisterSchema.ts";
import {UserLoginData} from "@/pages/auth/schema/AuthLoginSchema.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchErrorHandler from "@/common/handlers/query/FetchErrorHandler.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import FetchReturns from "@/common/type/fetch/FetchReturns.ts";

interface IAuthRepository {
    baseURL: string;
    register(params: UserRegisterData): Promise<FetchReturns>;
    login(params: UserLoginData): Promise<FetchReturns>;
    logout(): Promise<FetchReturns>;
}

const AuthRepository: IAuthRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,

    async register(data: UserRegisterData): Promise<FetchReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "register"})
        const fetchQueryFn = () => useFetchAPI({url, method: "POST", data});
        const message = "Failed to register. Please try again.";

        return await useFetchErrorHandler({fetchQueryFn, message});
    },

    async login(data: UserLoginData): Promise<FetchReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "login"});
        const fetchQueryFn = () => useFetchAPI({url, method: "POST", data});
        const message = "Failed to login. Please try again.";

        return useFetchErrorHandler({fetchQueryFn, message});
    },

    async logout(): Promise<FetchReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "logout"});
        const action = () => useFetchAPI({url, method: "POST"});

        return useFetchErrorHandler({fetchQueryFn: action});
    }
};

export default AuthRepository;
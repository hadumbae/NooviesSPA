import {UserRegisterData} from "@/pages/auth/schema/AuthRegisterSchema.ts";
import {UserLoginData} from "@/pages/auth/schema/AuthLoginSchema.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
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

    register(data: UserRegisterData): Promise<FetchReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "register"})
        return useFetchAPI({url, method: "POST", data});
    },

    login(data: UserLoginData): Promise<FetchReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "login"});
        return useFetchAPI({url, method: "POST", data});
    },

    logout(): Promise<FetchReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "logout"});
        return useFetchAPI({url, method: "POST"});
    },
};

export default AuthRepository;
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {UserLoginData, UserRegisterData} from "@/pages/auth/schema/form/AuthForm.types.ts";

interface IAuthRepository {
    baseURL: string;
    register(params: UserRegisterData): Promise<RequestReturns>;
    login(params: UserLoginData): Promise<RequestReturns>;
    logout(): Promise<RequestReturns>;
}

const AuthRepository: IAuthRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,

    register(data: UserRegisterData): Promise<RequestReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "register"})
        return useFetchAPI({url, method: "POST", data});
    },

    login(data: UserLoginData): Promise<RequestReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "login"});
        return useFetchAPI({url, method: "POST", data});
    },

    logout(): Promise<RequestReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "logout"});
        return useFetchAPI({url, method: "POST"});
    },
};

export default AuthRepository;
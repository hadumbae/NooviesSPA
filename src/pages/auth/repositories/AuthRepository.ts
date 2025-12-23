/**
 * Authentication API repository.
 *
 * Provides concrete implementations for authentication-related
 * API requests such as login, registration, and logout.
 */
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {AuthRegisterForm} from "@/pages/auth/schema/form/AuthRegisterForm.types.ts";
import {AuthLoginForm} from "@/pages/auth/schema/form/AuthLoginForm.types.ts";
import {AuthRepositoryMethods} from "@/pages/auth/repositories/AuthRepository.types.ts";

/**
 * Auth repository implementation.
 */
const AuthRepository: AuthRepositoryMethods = {
    /**
     * Base API endpoint for authentication routes.
     */
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,

    /**
     * Registers a new user.
     *
     * @param data - Registration form payload
     * @returns API response wrapper
     */
    register(data: AuthRegisterForm): Promise<RequestReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "register"});
        return useFetchAPI({url, method: "POST", data});
    },

    /**
     * Authenticates a user.
     *
     * @param data - Login form payload
     * @returns API response wrapper
     */
    login(data: AuthLoginForm): Promise<RequestReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "login"});
        return useFetchAPI({url, method: "POST", data});
    },

    /**
     * Logs out the currently authenticated user.
     *
     * @returns API response wrapper
     */
    logout(): Promise<RequestReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: "logout"});
        return useFetchAPI({url, method: "POST"});
    },
};

export default AuthRepository;

/**
 * Authentication repository contract.
 *
 * Defines the available authentication-related API methods and
 * the base URL used for all auth requests.
 */
import {AuthRegisterForm} from "@/pages/auth/schema/form/AuthRegisterForm.types.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {AuthLoginForm} from "@/pages/auth/schema/form/AuthLoginForm.types.ts";

/**
 * Auth repository method definitions.
 */
export interface AuthRepositoryMethods {
    /**
     * Base API endpoint for authentication requests.
     */
    baseURL: string;

    /**
     * Registers a new user.
     *
     * @param params - Registration form data
     * @returns API response wrapper
     */
    register(params: AuthRegisterForm): Promise<RequestReturns>;

    /**
     * Authenticates a user.
     *
     * @param params - Login form data
     * @returns API response wrapper
     */
    login(params: AuthLoginForm): Promise<RequestReturns>;

    /**
     * Logs out the currently authenticated user.
     *
     * @returns API response wrapper
     */
    logout(): Promise<RequestReturns>;
}

import {AuthBaseURL} from "@/domains/auth/_feat/access-auth-backend/repository/baseURL.ts";
import {
    loginUser,
    logoutUser,
    registerUser
} from "@/domains/auth/_feat/access-auth-backend/repository/AuthRepository.ts";

export {
    AuthBaseURL,
    registerUser,
    loginUser,
    logoutUser,
}


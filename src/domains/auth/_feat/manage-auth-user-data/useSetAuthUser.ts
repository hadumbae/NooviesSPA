import {User} from "@/domains/users/_schema/user/UserSchema";
import {useAuthContext} from "@/domains/auth/_feat/auth-context/useAuthContext.ts";

export function useSetAuthUser() {
    const authContext = useAuthContext();

    return (authUser: User) => {
        localStorage.setItem("authUser", JSON.stringify(authUser));

        if (authContext) {
            authContext.setUser(authUser);
            authContext.setLogout(false);
        }
    };
}

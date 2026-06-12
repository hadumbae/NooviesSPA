import {User} from "@/domains/users/schema/user/UserSchema";

export function isAdminUser(user?: User | null): boolean {
    return user?.roles.includes("ADMIN") ?? false;
}

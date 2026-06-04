import {User} from "@/domains/users/schemas/user/User.types.ts";

export function isAdminUser(user?: User | null): boolean {
    return user?.roles.includes("ADMIN") ?? false;
}

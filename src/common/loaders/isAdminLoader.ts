import AuthService from "@/pages/auth/service/AuthService.ts";

export default function isAdminLoader() {
    const action = () => AuthService.verifyAdminStatus();
}
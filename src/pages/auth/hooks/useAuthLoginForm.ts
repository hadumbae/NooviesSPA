import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
    import {UserLoginData, UserLoginSchema} from "@/pages/auth/schema/AuthLoginSchema.ts";

export default function useAuthLoginForm() {
    return useForm<UserLoginData>({
        resolver: zodResolver(UserLoginSchema),
        defaultValues: { email: "",  password: ""},
    });
}
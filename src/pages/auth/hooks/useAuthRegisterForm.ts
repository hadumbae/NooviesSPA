import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserRegisterData, UserRegisterSchema} from "@/pages/auth/schema/AuthRegisterSchema.ts";

export default function useAuthRegisterForm() {
    return useForm<UserRegisterData>({
        resolver: zodResolver(UserRegisterSchema),
        defaultValues: { name: "",  email: "",  password: "",  confirm: ""}
    });
}
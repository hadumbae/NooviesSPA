import {useQuery, UseQueryResult} from "@tanstack/react-query";

export default function useVerifyAuthUserAdminStatus(): UseQueryResult<boolean> {
    const queryKey = ["verify_user_admin_status"];
    const queryFn = async () => {

    };


    return useQuery({
        queryKey,
        queryFn
    });
}
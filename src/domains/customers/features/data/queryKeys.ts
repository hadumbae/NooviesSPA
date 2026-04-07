import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

export const CustomerViewQueryKeys = buildQueryKey(
    ["customer", "views"],
    {profile: ["profile", "overview"]},
);

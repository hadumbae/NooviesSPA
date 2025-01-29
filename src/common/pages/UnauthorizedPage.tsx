import {FC} from 'react';
import PageCenter from "@/common/components/page/PageCenter.tsx";
import {Link} from "react-router-dom";
import {cn} from "@/common/lib/utils.ts";

const UnauthorizedPage: FC = () => {
    return (
        <PageCenter className="space-y-5">
            <h1 className="dotgothic16-regular text-[100px]">
                403
            </h1>

            <h2 className="text-neutral-500">
                You must be logged in to access this route.
            </h2>

            <Link
                to="/auth/login"
                className={cn(
                    "text-neutral-500",
                    "underline",
                    "underline-offset-8",
                    "hover:text-black",
                    "hover:font-bold",
                )}
            >
                Login
            </Link>
        </PageCenter>
    );
};

export default UnauthorizedPage;

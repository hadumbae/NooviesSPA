import {FC} from 'react';
import PageCenter from "@/common/components/page/PageCenter.tsx";
import HoverLink from "@/common/components/navigation/HoverLink.tsx";

const UnauthorizedPage: FC = () => {
    return (
        <PageCenter className="space-y-5">
            <h1 className="font-dotGothic16 text-[50px] lg:text-[100px]">
                403
            </h1>

            <div className="flex flex-col items-center space-y-2">
                <h2 className="text-neutral-500">
                    You must be logged in to access this route.
                </h2>

                <HoverLink
                    to="/auth/login"
                    className="uppercase italic"
                >
                    Login
                </HoverLink>
            </div>


        </PageCenter>
    );
};

export default UnauthorizedPage;

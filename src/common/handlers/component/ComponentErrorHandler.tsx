import {FC} from 'react';
import {useNavigate, useRouteError} from "react-router-dom";
import PageCenter from "@/common/components/page/PageCenter.tsx";

const ComponentErrorHandler: FC = () => {
    const navigate = useNavigate();
    const error = useRouteError();

    if (!(error instanceof Error)) {
        navigate("/error");
        return null;
    }

    const {message} = error as Error;

    return (
        <PageCenter className="space-y-5">
            <h1 className="dotgothic16-regular text-[100px]">
                ERROR
            </h1>

            <h2 className="text-neutral-500">
                {message}
            </h2>
        </PageCenter>
    );
};

export default ComponentErrorHandler;

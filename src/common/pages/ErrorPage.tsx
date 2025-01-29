import {FC} from 'react';
import PageCenter from "@/common/components/page/PageCenter.tsx";

const ErrorPage: FC = () => {
    return (
        <PageCenter className="space-y-5">
            <h1 className="dotgothic16-regular text-[100px]">
                ERROR
            </h1>

            <h2 className="text-neutral-500">
                Oops, Something Went Wrong!
            </h2>
        </PageCenter>
    );
};

export default ErrorPage;

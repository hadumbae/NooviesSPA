import {FC} from 'react';
import {PageCenter} from "@/views/common/_comp/page";

const ErrorPage: FC = () => {
    return (
        <PageCenter className="space-y-5">
            <h1 className="font-dotGothic16 text-[100px]">
                ERROR
            </h1>

            <h2 className="text-neutral-500">
                Oops, Something Went Wrong!
            </h2>
        </PageCenter>
    );
};

export default ErrorPage;

import {FC} from 'react';
import PageCenter from "@/views/common/_comp/page/PageCenter.tsx";

const NotFoundPage: FC = () => {
    return (
        <PageCenter className="space-y-5">
            <h1 className="font-dotGothic16 text-[100px]">
                404
            </h1>

            <h2 className="text-neutral-500">
                Requested route not found.
            </h2>
        </PageCenter>
    );
};

export default NotFoundPage;

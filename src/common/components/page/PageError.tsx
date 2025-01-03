import {FC} from 'react';
import {FetchError} from "@/common/type/error/FetchError.ts";

interface Props {
    error?: Error | FetchError | null
}

const PageError: FC<Props> = ({error}) => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <span className="text-xl text-red-500">Oops! Something went wrong!</span>
            <span className="text-gray-400">{error?.message || "Unknown Error"}</span>
        </div>
    );
};

export default PageError;

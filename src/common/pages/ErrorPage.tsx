import {FC} from 'react';

const ErrorPage: FC = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center space-y-5">
            <span className="text-[80px] font-bold">500</span>
            <span className="text-md uppercase text-red-500">Something Went Wrong</span>
        </div>
    );
};

export default ErrorPage;

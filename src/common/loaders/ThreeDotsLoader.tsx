import {FC} from 'react';
import {ThreeDots} from "react-loader-spinner";

const ThreeDotsLoader: FC = () => {
    return (
        <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};

export default ThreeDotsLoader;

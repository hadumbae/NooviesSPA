import {FC} from 'react';
import {Loader} from "lucide-react";

const CenteredLoader: FC = () => {
    return (
        <div className="flex justify-center">
            <Loader className="animate-spin"/>
        </div>
    );
};

export default CenteredLoader;

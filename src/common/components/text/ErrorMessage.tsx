import {FC} from 'react';

interface Props {
    message?: string;
    error: Error;
}

const ErrorMessage: FC<Props> = ({message, error}) => {
    return (
        <span>
            {message || error.message || "Oops. Something went wrong!"}
        </span>
    );
};

export default ErrorMessage;

import {FC, PropsWithChildren} from 'react';
import useHttpResponseErrorHandler from "@/common/hooks/errors/useHttpResponseErrorHandler.ts";
import ErrorMessage from "@/common/components/text/ErrorMessage.tsx";

interface Props {
    error: Error;
}

const QueryErrorHandler: FC<PropsWithChildren<Props>> = ({children, error}) => {
    useHttpResponseErrorHandler(error);

    return (children || <ErrorMessage error={error} />);
};

export default QueryErrorHandler;

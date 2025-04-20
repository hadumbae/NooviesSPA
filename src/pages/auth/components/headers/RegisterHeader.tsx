import {FC} from 'react';

const RegisterHeader: FC = () => {
    return (
        <header>
            <h1 className="text-2xl font-bold">
                Register
            </h1>

            <span className="text-neutral-500 text-sm">
                Enter your details below to create an account.
            </span>
        </header>
    );
};

export default RegisterHeader;

/**
 * @fileoverview A loading indicator component using a three-dot animation.
 */

import {ReactElement} from 'react';
import {ThreeDots} from "react-loader-spinner";

/** A centered three-dot loading animation for indicating background processes. */
export function ThreeDotsLoader(): ReactElement {
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
}

import {useLocation} from "react-router-dom";

export default function useSetRedirectPath() {
    sessionStorage.removeItem("redirectPath");

    const {pathname, search, hash} = useLocation();
    const path = `${pathname}${search}${hash}`;

    sessionStorage.setItem("redirectPath", path);

    return path;
}
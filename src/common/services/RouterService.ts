interface IRouterService {
    setRedirectPath(url: URL): string;
}

const routerService: IRouterService = {
    setRedirectPath(url: URL): string {
        const {pathname, search, hash} = url;
        const path = `${pathname}${search}${hash}`;

        sessionStorage.setItem("redirectPath", path);

        return path;
    }
};

export default routerService;
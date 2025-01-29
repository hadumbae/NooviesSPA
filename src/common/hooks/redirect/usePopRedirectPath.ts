export default function usePopRedirectPath() {
    const path = sessionStorage.getItem("redirectPath");
    path && sessionStorage.removeItem("redirectPath");

    return path;
}
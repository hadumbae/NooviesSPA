import {QueryCache, QueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: Error) => {
            const {message} = error;

            toast.error(`API ERROR: ${message}`);
            console.error("API ERROR : ", message);
        }
    })
});

export default queryClient;
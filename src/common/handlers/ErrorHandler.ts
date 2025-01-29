export default function ({error, fnName}: {error: Error, fnName?: string}) {
    const {message = "Something went wrong!"} = error;
    const errorDesc = fnName ? `Error in ${fnName}` : "Error";

    console.error(`[${errorDesc}] ${message}`);
}
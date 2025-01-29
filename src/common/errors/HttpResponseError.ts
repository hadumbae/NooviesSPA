export default class HttpResponseError extends Error {
    public response: Response;

    constructor({message, response}: { message?: string, response: Response }) {
        super(message);

        if (Error.captureStackTrace) Error.captureStackTrace(this, HttpResponseError);

        this.response = response;
        this.name = this.constructor.name;
    }

    toString(): string {
        return `[${this.name}] Status : ${this.response.status} | ${this.message || "An Error Occurred."}`;
    }

    toJSON(): Record<string, any> {
        return {
            name: this.name,
            message: this.message,
            status: this.response.status,
            url: this.response.url,
        };
    }
}
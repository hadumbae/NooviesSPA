export default class HttpResponseError extends Error {
    public readonly response: Response;
    public readonly model?: string;

    constructor(params: { message?: string, response: Response, model?: string }) {
        const {message, response, model} = params;

        super(message);

        if (Error.captureStackTrace) Error.captureStackTrace(this, HttpResponseError);

        this.response = response;
        this.model = model;

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
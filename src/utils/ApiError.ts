export class ApiError extends Error {

    statusCode: number;

    constructor(statusCode: number, message: string) {
        
        super(message);
        this.statusCode = statusCode;

        // maintain prototype chain properly
        Object.setPrototypeOf(this, new.target.prototype);

        // capture stack trace
        Error.captureStackTrace(this);
    }

}
